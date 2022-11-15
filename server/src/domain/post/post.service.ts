import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  private WANT_NEW_DATA = -1;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async loadPostList(lastId: number, size: number): Promise<Post[]> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .orderBy('id', 'DESC');
    if (lastId != this.WANT_NEW_DATA) {
      queryBuilder.where('post.id < :lastId', { lastId: lastId });
    }
    const result = await queryBuilder.take(size).getMany();
    return result;
  }
}
