import { Injectable } from '@nestjs/common';
import { InquiryDto } from '../post/dto/controller-request.dto';
import { searchHistoryDto } from '../search/dto/controller-response.dto';
import { SearchHistoryMongoRepository } from '../search/search-history.mongo.repository';
import { PostRepository } from '../post/post.repository';
import { SEND_POST_CNT } from '../post/post.controller';
import { LoadPostListResponseDto } from '../post/dto/service-response.dto';
import { UserRepository } from './user.repository';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { ObjectId } from 'mongodb';
import { UserNotSameException } from 'src/exception/user-not-same.exception';
import { SearchHistoryNotFoundException } from 'src/exception/search-history-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
    private readonly searchHistoryRepository: SearchHistoryMongoRepository,
  ) {}

  async inquiryPosts(lastId: number, userId: number) {
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

  async getSearchHistories(userId: number) {
    const histories = await this.searchHistoryRepository.findAllByUserId(
      userId,
    );

    return histories.map((entity) => {
      return new searchHistoryDto(entity);
    });
  }

  async addSearchHistory(
    userId: number,
    { lastId, tags, reviewCount, likeCount, details }: InquiryDto,
  ) {
    if (lastId !== -1) {
      return;
    }

    const isSearch =
      tags.length !== 0 || reviewCount || likeCount || details.length !== 0;
    if (!isSearch) {
      return;
    }

    await this.searchHistoryRepository.addSearchHistory(
      userId,
      tags,
      reviewCount,
      likeCount,
      details,
    );
  }

  async deleteSearchHistory(userId: number, uuidStr: string) {
    const uuid = new ObjectId(uuidStr);

    const searchHistory = await this.searchHistoryRepository.findOne({
      where: {
        _id: uuid,
      },
    });

    if (!searchHistory) {
      throw new SearchHistoryNotFoundException();
    }
    if (searchHistory.userId !== userId) {
      throw new UserNotSameException();
    }

    await this.searchHistoryRepository.delete({
      _id: uuid,
    });
  }
}
