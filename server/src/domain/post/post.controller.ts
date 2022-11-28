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
  Delete,
  Param,
  Res,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { InqueryDto, WriteDto } from './dto/controller-request.dto';
import { Category } from './category';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { LikesService } from '../likes/likes.service';
import { AuthService } from '../auth/auth.service';
import { AccessTokenGuard } from '../auth/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { UserNotSameException } from '../../exception/user-not-same.exception';

export const SEND_POST_CNT = 3;
export const LATEST_DATA_CONDITION = -1;

@Controller('posts')
@ApiTags('게시물 API')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({
    summary: '조회',
    description: '검색조건에 맞는 최신 데이터를 가져옵니다',
  })
  @ApiOkResponse({ description: '올바른 요청입니다' })
  @ApiBadRequestResponse({ description: '잘못된 요청입니다' })
  async inqueryUsingFilter(
    @Query() inqueryDto: InqueryDto,
    @Headers() headers,
    @Res({ passthrough: true }) res,
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
    res.status(HttpStatus.ACCEPTED);

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
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '작성',
    description: '게시물을 작성합니다',
  })
  @ApiCreatedResponse({
    description: '게시물 작성에 성공했습니다',
  })
  @ApiNotFoundResponse({
    description: '해당 유저는 존재하지 않습니다',
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청입니다',
  })
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

  @Delete(':postId')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: '삭제',
    description: '게시물을 삭제합니다',
  })
  @ApiOkResponse({ description: '올바른 요청입니다' })
  @ApiForbiddenResponse({
    description: '삭제할 권한이 존재하지 않습니다',
  })
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  async deletePost(@Req() req: Request, @Param('postId') postId: number) {
    try {
      const userId = req.user['id'];
      await this.postService.delete(userId, postId);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UserNotSameException) {
        throw new ForbiddenException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
