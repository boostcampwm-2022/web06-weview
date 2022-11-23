import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, PostRepository, UserRepository],
  exports: [LikesService, LikesRepository],
})
export class LikesModule {}
