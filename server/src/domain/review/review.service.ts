import { Injectable } from '@nestjs/common';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import {
  ReviewGetAllRequestDto,
  ReviewWriteRequestDto,
} from './dto/controller-request.dto';
import { Review } from './review.entity';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { ReviewRepository } from './review.repository';
import { MoreThan } from 'typeorm';
import { ReviewListResponseDto } from './dto/controller-response.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async write(userId: number, { postId, content }: ReviewWriteRequestDto) {
    const userEntity = await this.userRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });
    if (userEntity === null) {
      throw new UserNotFoundException();
    }

    const postEntity = await this.postRepository.findOneBy({
      id: postId,
      isDeleted: false,
    });
    if (postEntity === null) {
      throw new PostNotFoundException();
    }

    const reviewEntity = new Review();
    reviewEntity.user = userEntity;
    reviewEntity.post = postEntity;
    reviewEntity.content = content;

    await this.reviewRepository.save(reviewEntity);
  }

  async getReviewsOfPost(postId: number, { lastId }: ReviewGetAllRequestDto) {
    const REQUEST_CNT = 3;
    let reviews =
      (await this.reviewRepository.find({
        relations: ['post', 'user'],
        where: {
          post: {
            id: postId,
          },
          id: MoreThan(lastId),
        },
        take: REQUEST_CNT + 1,
      })) || [];

    const isLast = reviews.length < REQUEST_CNT + 1;
    if (!isLast) {
      reviews = reviews.slice(0, -1);
    }

    const reviewDtos = new ReviewListResponseDto(reviews, lastId, isLast);

    return reviewDtos;
  }
}
