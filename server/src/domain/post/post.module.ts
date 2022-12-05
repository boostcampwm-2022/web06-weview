import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { TagRepository } from '../tag/tag.repository';
import { PostSubscriber } from './post.subscriber';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { UserRepository } from '../user/user.repository';
import { LikesRepository } from '../likes/likes.repository';
import { LikesService } from '../likes/likes.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { SearchHistoryMongoRepository } from '../search/search-history.mongo.repository';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    LikesService,
    AuthService,
    UserService,
    PostRepository,
    TagRepository,
    PostToTagRepository,
    UserRepository,
    LikesRepository,
    SearchHistoryMongoRepository,
    PostSubscriber,
  ],
  imports: [HttpModule, JwtModule.register({})], // TODO 우석이랑 이야기해보고 App으로 올릴지 이야기하기
  exports: [PostService, PostRepository],
})
export class PostModule {}
