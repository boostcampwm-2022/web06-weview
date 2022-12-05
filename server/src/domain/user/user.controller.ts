import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
import { UserInqueryPostDto } from './dto/controller-request.dto';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { UserNotSameException } from 'src/exception/user-not-same.exception';
import { SearchHistoryNotFoundException } from 'src/exception/search-history-not-found.exception';

@Controller()
@ApiTags('사용자 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 특정 사용자가 작성한 게시물을 최신 순으로 가져옵니다
   */
  @Get('users/:userId/posts')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async inqueryPosts(
    @Param('userId') userId: number,
    @Query() requestDto: UserInqueryPostDto,
  ) {
    try {
      const { lastId } = requestDto;
      return await this.userService.inqueryPosts(lastId, userId);
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
  @ApiNoContentResponse()
  @ApiNotFoundResponse({
    description: '유저 혹은 게시물이 존재하지 않습니다',
  })
  @ApiForbiddenResponse({
    description: '삭제할 권한이 존재하지 않습니다',
  })
  async deleteSearchHistory(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
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

    res.status(HttpStatus.NO_CONTENT);
    return;
  }
}
