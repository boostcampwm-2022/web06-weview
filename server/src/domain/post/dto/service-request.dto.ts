import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class LoadPostListRequestDto {
  //TODO 이름 변경. SearchCondition..
  constructor(
    lastId: number,
    tags: string[],
    reviewCount: number,
    likeCount: number,
    details: string[],
  ) {
    this.lastId = lastId;
    this.tags = tags;
    this.reviewCount = reviewCount;
    this.likeCount = likeCount;
    this.details = details;
  }

  @IsInt()
  @Min(-1)
  lastId: number;

  tags: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  reviewCount?: number;

  @IsOptional()
  @Min(1)
  likeCount?: number;

  @IsOptional()
  details?: string[];
}
