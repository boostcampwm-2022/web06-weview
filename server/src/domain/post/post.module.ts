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
import { BookmarkService } from '../bookmark/bookmark.service';
import { BookmarkRepository } from '../bookmark/bookmark.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PostSearchService } from './post-search.service';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    LikesService,
    AuthService,
    UserService,
    BookmarkService,
    PostSearchService,
    PostRepository,
    TagRepository,
    PostToTagRepository,
    UserRepository,
    BookmarkRepository,
    LikesRepository,
    SearchHistoryMongoRepository,
    PostSubscriber,
  ],
  imports: [
    HttpModule,
    JwtModule.register({}),
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        // TODO env로 이동
        node: 'http://localhost:9200',
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
      }),
    }),
  ], // TODO App으로 올릴지 이야기하기
  exports: [PostService, PostRepository, ElasticsearchModule],
})
export class PostModule {}
