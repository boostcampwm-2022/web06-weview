import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Category } from '../category';

export class LoadPostListRequestDto {
  constructor(
    lastId: number,
    tags: string[],
    authors: string[],
    category: Category,
    writtenAnswer: number,
    likesCnt: number,
    search: string,
  ) {
    this.lastId = lastId;
    this.tags = tags;
    this.authors = authors;
    this.category = category;
    this.writtenAnswer = writtenAnswer;
    this.likesCnt = likesCnt;
    this.search = search;
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
  writtenAnswer?: number;

  @IsOptional()
  @Min(1)
  likesCnt?: number;

  @IsOptional()
  search?: string;
}
