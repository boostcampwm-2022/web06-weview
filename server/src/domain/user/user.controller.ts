import {
  Controller,
  Get,
  HttpStatus,
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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserInqueryPostDto } from './dto/controller-request.dto';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { AccessTokenGuard } from '../auth/access-token.guard';

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
    }
  }

  /**
   * 로그인한 사용자의 검색 기록을 가져옵니다.
   */
  @Get('search/histories')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @ApiNoContentResponse({
    description: '검색 기록이 없습니다',
  })
  @ApiOkResponse({
    description: '올바른 요청입니다',
  })
  @ApiUnauthorizedResponse()
  async getSearchHistories(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user['id'];

    const histories = await this.userService.getSearchHistories(userId);
    if (histories.length === 0) {
      res.status(HttpStatus.NO_CONTENT);
      return;
    }

    return histories;
  }
}
