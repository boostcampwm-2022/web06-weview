import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInqueryPostDto } from './dto/controller-request.dto';
import { UserNotFoundException } from '../../exception/user-not-found.exception';

@Controller('users')
@ApiTags('사용자 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 특정 사용자가 작성한 게시물을 최신 순으로 가져옵니다
   */
  @Get(':userId/posts')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async inqueryPosts(
    @Req() req: Request,
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
}
