import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserInquiryPostDto } from './dto/controller-request.dto';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { UserNotSameException } from 'src/exception/user-not-same.exception';
import { SearchHistoryNotFoundException } from 'src/exception/search-history-not-found.exception';
import { LikesService } from '../likes/likes.service';
import { BookmarkService } from '../bookmark/bookmark.service';

@Controller()
@ApiTags('사용자 API')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly likesService: LikesService,
    private readonly bookmarkService: BookmarkService,
  ) {}

  /**
   * 특정 사용자가 작성한 게시물을 최신 순으로 가져옵니다
   */
  @Get('users/:userId/posts')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async inquiryPosts(
    @Param('userId') userId: number,
    @Query() requestDto: UserInquiryPostDto,
  ) {
    try {
      const { lastId } = requestDto;
      const result = await this.userService.inquiryPosts(lastId, userId);

      // TODO 구조를 아예 바꿔야돼서 일단 post controller 복붙으로 해결함
      const postIdsYouLike = await this.likesService.findPostIdsByUserId(
        userId,
      );
      result.posts.forEach((post) => {
        if (postIdsYouLike.includes(post.id)) {
          post.isLiked = true;
        }
      });

      const postIdsYouBookmark = await this.bookmarkService.findPostIdsByUserId(
        userId,
      );
      result.posts.forEach((post) => {
        if (postIdsYouBookmark.includes(post.id)) {
          post.isBookmarked = true;
        }
      });

      return result;
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * 로그인한 사용자의 검색 기록을 가져옵니다.
   */
  @Get('search/histories')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  async getSearchHistories(@Req() req: Request) {
    const userId = req.user['id'];

    const histories = await this.userService.getSearchHistories(userId);

    return histories;
  }

  /**
   * 로그인한 사용자의 검색 기록을 삭제합니다.
   */
  @Delete('search/histories/:uuidStr')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  @ApiForbiddenResponse({
    description: '삭제할 권한이 존재하지 않습니다',
  })
  async deleteSearchHistory(
    @Req() req: Request,
    @Param('uuidStr') uuidStr: string,
  ) {
    const userId = req.user['id'];

    try {
      await this.userService.deleteSearchHistory(userId, uuidStr);
    } catch (err) {
      if (err instanceof SearchHistoryNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UserNotSameException) {
        throw new ForbiddenException(err.message);
      }

      throw new InternalServerErrorException();
    }

    return;
  }
}
