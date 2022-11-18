import { Module } from '@nestjs/common';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostToTag } from '../tag/post-to-tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../typeorm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([Post]),
    TypeOrmModule.forFeature([PostToTag]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
