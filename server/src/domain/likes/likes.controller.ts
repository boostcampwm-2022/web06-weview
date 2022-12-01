import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { LikesService } from './likes.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { UserNotFoundException } from '../../exception/user-not-found.exception';

@Controller()
@ApiTags('좋아요 API')
@ApiBearerAuth('accessToken')
@ApiUnauthorizedResponse()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  /**
   * 좋아요를 추가합니다
   */
  @Post('posts/:postId/likes')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: '좋아요 성공' })
  @ApiNotFoundResponse({ description: '게시물 or 유저가 없습니다' })
  async likes(@Req() req: Request, @Param('postId') postId: number) {
    try {
      const userId = req.user['id'];
      await this.likesService.addLikes(userId, postId);
    } catch (err) {
      if (err instanceof PostNotFoundException) {
        throw new NotFoundException(err.message);
      }
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * 좋아요를 취소합니다
   */
  @Delete('posts/:postId/likes')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: '좋아요 취소 성공',
  })
  async cancelLikes(@Req() req: Request, @Param('postId') postId: number) {
    const userId = req.user['id'];
    await this.likesService.cancelLikes(userId, postId);
  }
}
