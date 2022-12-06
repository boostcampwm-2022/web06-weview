import { Injectable } from '@nestjs/common';
import { PostAlreadyBookmarkedException } from '../../exception/post-already-bookmarked.exception';
import { BookmarkNotFoundException } from '../../exception/bookmark-not-found.exception';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { Bookmark } from './bookmark.entity';
import { BookmarkRepository } from './bookmark.repository';
import {
  BookmarkCreateRequestDto,
  BookmarkDeleteRequestDto,
  BookmarkGetAllRequestDto,
} from './dto/controller-request.dto';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { LoadPostListResponseDto } from '../post/dto/service-response.dto';

@Injectable()
export class BookmarkService {
  constructor(
    private bookmarkRepository: BookmarkRepository,
    private userRepository: UserRepository,
    private postRepository: PostRepository,
  ) {}

  async getAll(userId: number, { lastId }: BookmarkGetAllRequestDto) {
    const REQUEST_CNT = 3;
    let bookmarks =
      (await this.bookmarkRepository.findAllByUserId(
        userId,
        lastId,
        REQUEST_CNT,
      )) || [];

    const isLast = bookmarks.length < REQUEST_CNT + 1;
    if (!isLast) {
      bookmarks = bookmarks.slice(0, -1);
    }

    const postList = new LoadPostListResponseDto(
      bookmarks.map((bookmark) => {
        bookmark.post.user = bookmark.user;
        return bookmark.post;
      }),
      isLast,
    );

    return postList.posts.map((post) => {
      post.isBookmarked = true;
      return post;
    });
  }

  async bookmark(userId: number, { postId }: BookmarkCreateRequestDto) {
    const userPromise = this.userRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });

    const postPromise = this.postRepository.findOneBy({
      id: postId,
      isDeleted: false,
    });

    const [user, post] = await Promise.all([userPromise, postPromise]);

    if (!user) {
      throw new UserNotFoundException();
    }
    if (!post) {
      throw new PostNotFoundException();
    }

    // TODO 엔티티로 비교하면 값을 안가져옴.. 알아보자
    const exist = await this.bookmarkRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
    });

    if (exist) {
      throw new PostAlreadyBookmarkedException();
    }

    const bookmark = new Bookmark(user, post);
    await this.bookmarkRepository.insert(bookmark);
  }

  async unbookmark(userId: number, { postId }: BookmarkDeleteRequestDto) {
    const bookmark = await this.bookmarkRepository.findOne({
      relations: ['user', 'post'],
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
    });

    if (!bookmark) {
      throw new BookmarkNotFoundException();
    }
    if (bookmark.user.id !== userId) {
      throw new UserNotSameException();
    }

    await this.bookmarkRepository.remove(bookmark);
  }

  async findPostIdsByUserId(userId: number) {
    const postsYouBookmarked = await this.bookmarkRepository.find({
      relations: ['user', 'post'],
      where: {
        user: {
          id: userId,
        },
      },
    });

    return postsYouBookmarked.map((bookmarkInfo) => bookmarkInfo.post.id);
  }
}
