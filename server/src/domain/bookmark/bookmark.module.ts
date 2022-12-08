import { Module } from '@nestjs/common';
import { LikesRepository } from '../likes/likes.repository';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { BookmarkController } from './bookmark.controller';
import { BookmarkRepository } from './bookmark.repository';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [
    BookmarkService,
    BookmarkRepository,
    UserRepository,
    PostRepository,
    LikesRepository,
  ],
  exports: [BookmarkService, BookmarkRepository],
})
export class BookmarkModule {}
