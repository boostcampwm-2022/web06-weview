import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { InqueryUsingFilterDto } from './dto/controller-response.dto';
import { LoadPostListResponseDto } from './dto/service-response.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async inqueryUsingFilter(
    @Query('lastId') lastId: number,
    @Query('category') category: string,
    @Query('tags') tags?: string[],
    @Query('authors') authors?: string[],
    @Query('writtenAnswer') writtenAnswer?: number,
    @Query('scores') scores?: number,
  ): Promise<LoadPostListResponseDto> {
    if (tags === undefined) {
      tags = [];
    }
    if (authors === undefined) {
      authors = [];
    }
    const result = await this.postService.loadPostList(
      Number(lastId), //TODO 다른 방법 찾기
      3,
      authors,
      category as Category,
      scores,
    );
    return result;
  }
}
