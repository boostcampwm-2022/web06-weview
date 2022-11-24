import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { LikesService } from './likes.service';

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('posts/:postId/likes')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async likes(@Req() req: Request, @Param('postId') postId: number) {
    const userId = req.user['id'];
    await this.likesService.addLikes(userId, postId);
  }

  @Delete('posts/:postId/likes')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelLikes(@Req() req: Request, @Param('postId') postId: number) {
    const userId = req.user['id'];
    await this.likesService.cancelLikes(userId, postId);
  }
}
