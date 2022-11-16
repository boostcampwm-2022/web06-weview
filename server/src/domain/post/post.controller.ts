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
    @Query('tags') tagString?: string,
    @Query('authors') authors?: string[],
    @Query('writtenAnswer') writtenAnswer?: number,
    @Query('scores') scores?: number,
  ): Promise<LoadPostListResponseDto> {
    if (tagString === undefined) {
      const tags = [];
    }
    if (authors === undefined) {
      authors = [];
    }
    const tags = tagString.slice(1, -1).split(','); //TODO 입력값 자체에서 검증을 하도록 변경
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
}
