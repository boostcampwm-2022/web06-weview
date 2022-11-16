import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostTag } from '../post-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostTag])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
