import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostToTag } from '../tag/post-to-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostToTag])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
