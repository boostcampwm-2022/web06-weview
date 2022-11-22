import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { TagRepository } from '../tag/tag.repository';
import { LikesRepository } from '../likes/likes.repository';
import { User } from '../user/user.entity';
import { PostSubscriber } from './post.subscriber';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    TagRepository,
    PostToTagRepository,
    UserRepository,
    PostSubscriber
  ],
  exports: [PostService, PostRepository],
})
export class PostModule {}
