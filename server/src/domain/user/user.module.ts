import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { SearchHistoryMongoRepository } from '../search/search-history.mongo.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PostRepository,
    SearchHistoryMongoRepository,
  ],
})
export class UserModule {}
