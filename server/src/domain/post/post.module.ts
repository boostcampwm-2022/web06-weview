import { Module } from '@nestjs/common';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../typeorm/typeorm-ex.module';
import { PostToTag } from '../post-to-tag/post-to-tag.entity';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { TagRepository } from '../tag/tag.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PostRepository,
      PostToTagRepository,
      TagRepository,
    ]),
    TypeOrmModule.forFeature([Post, PostToTag]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
