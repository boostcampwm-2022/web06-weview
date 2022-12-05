import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, MongoRepository } from 'typeorm';
import { SearchHistory } from './search-history.mongo';

@Injectable()
export class SearchHistoryMongoRepository extends MongoRepository<SearchHistory> {
  constructor(@InjectDataSource('mongo') private datasource: DataSource) {
    super(SearchHistory, datasource.mongoManager);
  }

  async findAllByUserId(userId: number) {
    return await this.find({
      where: {
        userId: userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async addSearchHistory(userId, tags, reviewCount, likeCount, details) {
    let searchHistory = await this.findOne({
      where: {
        userId,
        tags,
        reviewCount,
        likeCount,
        details,
      },
    });

    if (!searchHistory) {
      searchHistory = new SearchHistory(
        userId,
        tags,
        reviewCount,
        likeCount,
        details,
      );
    }

    this.save(searchHistory);
  }
}
