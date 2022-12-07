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
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { InqueryDto, WriteDto } from './dto/controller-request.dto';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { LikesService } from '../likes/likes.service';
import { AuthService } from '../auth/auth.service';
import { AccessTokenGuard } from '../auth/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { UserService } from '../user/user.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export const SEND_POST_CNT = 3;
export const LATEST_DATA_CONDITION = -1;

@Controller('posts')
@ApiTags('게시물 API')
@ApiBearerAuth('accessToken')
@ApiBadRequestResponse({ description: '잘못된 요청입니다' })
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly likesService: LikesService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly bookmarkService: BookmarkService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 검색조건에 맞는 최신 데이터를 가져옵니다
   */
  @Get()
  @ApiOkResponse({ description: '올바른 요청입니다' })
  async inqueryUsingFilter(
    @Query() inqueryDto: InqueryDto,
    @Headers() headers,
  ): Promise<LoadPostListResponseDto> {
    const { tags, lastId, reviewCount, likeCount, details } = inqueryDto;
    const returnValue = await this.postService.loadPostList(
      new LoadPostListRequestDto(lastId, tags, reviewCount, likeCount, details),
    );
    await this.addLikesCntColumnEveryPosts(returnValue);
    await this.addLikesToPostIfLogin(headers['authorization'], returnValue);
    await this.addBookmarksToPostIfLogin(headers['authorization'], returnValue);

    await this.addSearchHistory(headers['authorization'], inqueryDto);

    this.applyTags(tags, lastId);

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

  private async addBookmarksToPostIfLogin(
    token,
    result: LoadPostListResponseDto,
  ) {
    if (token) {
      const userId = this.authService.authenticate(token);

      if (userId) {
        const postIdsYouBookmark =
          await this.bookmarkService.findPostIdsByUserId(userId);

        result.posts.forEach((post) => {
          if (postIdsYouBookmark.includes(post.id)) {
            post.isBookmarked = true;
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

  private async addSearchHistory(token, inqueryDto: InqueryDto) {
    if (!token) {
      return;
    }

    const userId = this.authService.authenticate(token);
    if (!userId) {
      return;
    }

    // TODO 로그인한 유저가 처음 글 검색시 검색 기록을 추가해야 하기 때문에 글 검색이 있는 PostController에 위치
    // 후에 글 검색 리팩토링시 같이 리팩토링이 필요할 듯
    await this.userService.addSearchHistory(userId, inqueryDto);
  }

  /**
   * 게시물을 작성합니다
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: '게시물 작성에 성공했습니다',
  })
  @ApiNotFoundResponse({
    description: '해당 유저는 존재하지 않습니다',
  })
  @ApiUnauthorizedResponse()
  async write(@Req() req: Request, @Body() writeDto: WriteDto) {
    try {
      const userId = req.user['id'];
      await this.postService.write(userId, writeDto);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException(err.message);
    }

    return {
      message: '글 작성에 성공했습니다.',
    };
  }

  /**
   * 게시물을 삭제합니다
   */
  @Delete(':postId')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: '올바른 요청입니다' })
  @ApiForbiddenResponse({
    description: '삭제할 권한이 존재하지 않습니다',
  })
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  @ApiUnauthorizedResponse()
  async deletePost(@Req() req: Request, @Param('postId') postId: number) {
    try {
      const userId = req.user['id'];
      await this.postService.delete(userId, postId);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UserNotSameException) {
        throw new ForbiddenException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * 게시물 한 건을 조회합니다
   */
  @Get(':postId')
  @ApiOkResponse({ description: '올바른 요청입니다' })
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  async inqueryPost(@Param('postId') postId: number, @Headers() header) {
    try {
      const post = await this.postService.inqueryPost(postId);
      post.likesCount = await this.likesService.countLikesCntByPostId(post.id);

      const token = header['authorization'];
      if (token) {
        const userId = this.authService.authenticate(token);
        if (userId) {
          post.isLiked = await this.likesService.getIsLiked(postId, userId);
          post.isBookmarked = await this.bookmarkService.getIsBookmarked(
            postId,
            userId,
          );
        }
      }

      return { post: post };
    } catch (err) {
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  private applyTags(tags: string[], lastId: number) {
    if (lastId !== -1) {
      return;
    }

    if (tags.length === 0) {
      return;
    }
    this.httpService
      .post(`${this.configService.get('SCHEDULER_SERVER_URL')}/tags`, {
        tags: tags,
      })
      .subscribe({
        error: (e) => {
          e;
        },
      });
  }
}
