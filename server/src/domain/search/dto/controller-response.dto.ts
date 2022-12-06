import { SearchHistory } from '../search-history.mongo';

export class searchHistoryDto {
  id: string;

  tags: string[];

  reviewCount: number;

  likeCount: number;

  details: string[];

  updatedAt: Date;

  constructor(entity: SearchHistory) {
    this.id = entity._id.toHexString();
    this.tags = entity.tags;
    this.reviewCount = entity.reviewCount;
    this.likeCount = entity.likeCount;
    this.details = entity.details;
    this.updatedAt = entity.updatedAt;
  }
}
