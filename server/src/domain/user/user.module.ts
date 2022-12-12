import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { SearchHistoryMongoRepository } from '../search/search-history.mongo.repository';
import { LikesService } from '../likes/likes.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { LikesRepository } from '../likes/likes.repository';
import { BookmarkRepository } from '../bookmark/bookmark.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    LikesService,
    BookmarkService,
    UserRepository,
    PostRepository,
    LikesRepository,
    BookmarkRepository,
    SearchHistoryMongoRepository,
  ],
})
export class UserModule {}
