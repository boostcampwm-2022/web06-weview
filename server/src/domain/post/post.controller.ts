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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PostService } from './post.service';
import { InqueryUsingFilterDto } from './dto/controller-response.dto';
import { LoadPostListResponseDto } from './dto/service-response.dto';
import {WriteDto} from "./dto/controller-request.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async inqueryUsingFilter(
    @Query('lastId') lastId: number,
    @Query('category') category: string,
    @Query('tags') tagString?: string,
    @Query('authors') authors?: string[],
    @Query('writtenAnswer') writtenAnswer?: number,
    @Query('scores') scores?: number,
  ): Promise<LoadPostListResponseDto> {
    let tags = [];
    if (authors === undefined) {
      authors = [];
    }
    if (tagString !== undefined) {
      tags = tagString.slice(1, -1).split(','); //TODO 입력값 자체에서 검증을 하도록 변경

    }
    const result = await this.postService.loadPostList(
      3,
      Number(lastId), //TODO 다른 방법 찾기,
      tags,
      authors,
      category as Category,
      scores,
    );
    return result;
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
