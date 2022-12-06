import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { PostAlreadyBookmarkedException } from 'src/exception/post-already-bookmarked.exception';
import { BookmarkNotFoundException } from 'src/exception/bookmark-not-found.exception';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { BookmarkService } from './bookmark.service';
import {
  BookmarkCreateRequestDto,
  BookmarkDeleteRequestDto,
  BookmarkGetAllRequestDto,
} from './dto/controller-request.dto';

@Controller('bookmarks')
@ApiTags('북마크 API')
@ApiBearerAuth('accessToken')
@ApiUnauthorizedResponse()
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  /**
   * 현재 로그인한 유저의 북마크 목록을 가져옵니다
   */
  @Get()
  @UseGuards(AccessTokenGuard)
  async getAll(
    @Req() req: Request,
    @Query() requestDto: BookmarkGetAllRequestDto,
  ) {
    const userId = req.user['id'];

    return await this.bookmarkService.getAll(userId, requestDto);
  }

  /**
   * 게시물을 북마크합니다
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  @ApiConflictResponse({
    description: '이미 북마크한 게시물입니다',
  })
  async bookmark(
    @Req() req: Request,
    @Body() requestDto: BookmarkCreateRequestDto,
  ) {
    const userId = req.user['id'];

    try {
      await this.bookmarkService.bookmark(userId, requestDto);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof PostAlreadyBookmarkedException) {
        throw new ConflictException(err.message);
      }

      throw new InternalServerErrorException();
    }

    return;
  }

  /**
   * 게시물 북마크를 삭제합니다
   */
  @Delete()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: '유저가 존재하지 않거나 북마크하지 않은 게시물입니다',
  })
  async unbookmark(
    @Req() req: Request,
    @Query() requestDto: BookmarkDeleteRequestDto,
  ) {
    const userId = req.user['id'];
    try {
      await this.bookmarkService.unbookmark(userId, requestDto);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof BookmarkNotFoundException) {
        throw new NotFoundException(err.message);
      }

      throw new InternalServerErrorException();
    }

    return;
  }
}
