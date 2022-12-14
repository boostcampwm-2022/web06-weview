import { Injectable } from '@nestjs/common';
import { Likes } from './likes.entity';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { LikesRepository } from './likes.repository';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { UserNotFoundException } from '../../exception/user-not-found.exception';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addLikes(userId: number, postId: number) {
    const likes = new Likes();
    const [user, post] = await Promise.all([
      this.userRepository.findOneBy({ id: userId }),
      this.postRepository.findOneBy({ id: postId }),
    ]);
    if (post === null) {
      throw new PostNotFoundException();
    }
    if (user === null) {
      throw new UserNotFoundException();
    }
    likes.user = user;
    likes.post = post;
    await this.likesRepository.save(likes);
    this.postRepository.increaseLikeCount(post);
  }

  async cancelLikes(userId: number, postId: number) {
    const [user, post] = await Promise.all([
      this.userRepository.findOneBy({ id: userId }),
      this.postRepository.findOneBy({ id: postId }),
    ]);
    if (post === null || user === null) {
      return;
    }

    await this.likesRepository.delete({
      userId: userId,
      postId: postId,
    });
    this.postRepository.decreaseLikeCount(post);
  }

  async findPostIdsByUserId(userId: number) {
    const postsYouLiked = await this.likesRepository.findBy({
      userId: userId,
    });
    return postsYouLiked.map((likesInfo) => likesInfo.postId);
  }

  async getIsLiked(postId: number, userId: number) {
    const likes = await this.likesRepository.findOneBy({
      postId,
      userId,
    });

    return !!likes;
  }

  async countLikesCntByPostId(postId: number) {
    return this.likesRepository.count({
      where: {
        postId: postId,
      },
    });
  }
}
