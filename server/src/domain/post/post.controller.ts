import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WriteDto } from '../auth/dto/controller-request.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
