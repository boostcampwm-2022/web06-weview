import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Category } from '../category';

export class LoadPostListRequestDto {
  constructor(
    lastId: number,
    tags: string[],
    authors: string[],
    category: Category,
    reviews: number,
    likesCnt: number,
    detail: string,
  ) {
    this.lastId = lastId;
    this.tags = tags;
    this.authors = authors;
    this.category = category;
    this.reviews = reviews;
    this.likesCnt = likesCnt;
    this.detail = detail;
  }

  @IsInt()
  @Min(-1)
  lastId: number;

  tags: string[];

  authors: string[];

  @IsOptional()
  category: Category; // TODO 객체, enum 타입 검사 찾아보기

  @IsOptional()
  @IsInt()
  @Min(1)
  reviews?: number;

  @IsOptional()
  @Min(1)
  likesCnt?: number;

  @IsOptional()
  detail?: string;
}
