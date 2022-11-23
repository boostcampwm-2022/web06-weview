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
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostService } from './post.service';
import { InqueryUsingFilterDto } from './dto/controller-response.dto';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import { InqueryDto, WriteDto } from './dto/controller-request.dto';
import { Category } from './category';
import { LoadPostListRequestDto } from './dto/service-request.dto';

export const SEND_POST_CNT = 3;
export const LATEST_DATA_CONDITION = -1;

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async inqueryUsingFilter(
    @Query() inqueryDto: InqueryDto,
  ): Promise<LoadPostListResponseDto> {
    const { lastId, category, reviews, likes: likesCnt, detail } = inqueryDto;
    let { authors, tags } = inqueryDto;
    // TODO 35-39 덜 깔끔해보임
    if (authors === undefined) {
      authors = [];
    }
    if (tags === undefined) {
      tags = [];
    }

    return await this.postService.loadPostList(
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
  }

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
