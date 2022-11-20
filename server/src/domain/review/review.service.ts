import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { ReviewWriteRequestDto } from './dto/controller-request.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}
