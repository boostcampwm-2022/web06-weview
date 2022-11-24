import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Get,
  Query,
  InternalServerErrorException,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostService } from './post.service';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { InqueryDto, WriteDto } from './dto/controller-request.dto';
import { Category } from './category';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { LikesService } from '../likes/likes.service';
import { AuthService } from '../auth/auth.service';

export const SEND_POST_CNT = 3;
export const LATEST_DATA_CONDITION = -1;

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async inqueryUsingFilter(
    @Query() inqueryDto: InqueryDto,
    @Headers() headers,
  ): Promise<LoadPostListResponseDto> {
    const {
      lastId,
      category,
      reviews,
      likes: likesCnt,
      detail,
      authors,
      tags,
    } = inqueryDto;

    const returnValue = await this.postService.loadPostList(
      new LoadPostListRequestDto(
        lastId,
        tags,
        authors,
        category as Category,
        reviews,
        likesCnt,
        detail,
      ),
    );
    await this.addLikesCntColumnEveryPosts(returnValue);
    await this.addLikesToPostIfLogin(headers['authorization'], returnValue);
    return returnValue;
  }

  private async addLikesToPostIfLogin(token, result: LoadPostListResponseDto) {
    if (token) {
      const userId = this.authService.authenticate(token);
      if (userId) {
        const postIdsYouLike = await this.likesService.findPostIdsByUserId(
          userId,
        );
        result.posts.forEach((post) => {
          if (postIdsYouLike.includes(post.id)) {
            post.isLiked = true;
          }
        });
      }
    }
  }

  private async addLikesCntColumnEveryPosts(result: LoadPostListResponseDto) {
    const ary = [];
    for (const post of result.posts) {
      ary.push(this.likesService.countLikesCntByPostId(post.id));
    }
    const likesCntStore = await Promise.all(ary);
    for (let i = 0; i < result.posts.length; i++) {
      result.posts[i].likesCount = likesCntStore[i];
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async write(@Req() req: Request, @Body() writeDto: WriteDto) {
    const userId = req.user['id'];

    try {
      await this.postService.write(userId, writeDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }

    return {
      message: '글 작성에 성공했습니다.',
    };
  }
}
