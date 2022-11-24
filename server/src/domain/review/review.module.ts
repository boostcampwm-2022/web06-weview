import { Module } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, UserRepository, PostRepository, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
