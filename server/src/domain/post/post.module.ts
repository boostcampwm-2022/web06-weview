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
import { ImageRepository } from '../image/image.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ImageRepository,
  ],
  imports: [
    HttpModule,
    JwtModule.register({}),
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // TODO env로 이동
        node: configService.get('ELASTICSEARCH_URL'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'), //TODO username, password 넣기
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
        maxRetries: configService.get('ELASTICSEARCH_MAX_RETRIES'),
        requestTimeout: configService.get('ELASTICSEARCH_REQUEST_TIMEOUT'),
        pingTimeout: configService.get('ELASTICSEARCH_PING_TIMEOUT'),
        sniffOnStart: configService.get('ELASTICSEARCH_SNIFF_ON_START'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [PostService, PostRepository, ElasticsearchModule],
})
export class PostModule {}
