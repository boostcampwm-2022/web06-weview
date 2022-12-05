import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post/post.repository';
import { SEND_POST_CNT } from '../post/post.controller';
import { LoadPostListResponseDto } from '../post/dto/service-response.dto';
import { UserRepository } from './user.repository';
import { UserNotFoundException } from '../../exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async inqueryPosts(lastId: number, userId: number) {
    let isLast = true;

    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new UserNotFoundException();
    }

    const result = await this.postRepository.findByUserId(lastId, userId);
    if (this.canGetNextPost(result.length)) {
      result.pop();
      isLast = false;
    }
    return new LoadPostListResponseDto(result, isLast);
  }

  private canGetNextPost(resultCnt: number) {
    return resultCnt === SEND_POST_CNT + 1;
  }
}
