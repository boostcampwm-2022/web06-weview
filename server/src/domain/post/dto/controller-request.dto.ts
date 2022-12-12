import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InquiryDto {
  // TODO DTO 이름 변경하기
  /**
   * lastId를 기준으로 더 최신의 데이터를 반환합니다.
   * lastId를 입력하지 않으면 가장 최신의 데이터를 반환합니다
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-1, {
    message: 'lastId는 -1과 Post의 인덱스만 입력 가능합니다',
  })
  lastId?: number = -1;

  /**
   * 입력받은 태그가 포함되는 게시물을 반환합니다
   */
  @IsOptional()
  tags?: string[] = [];

  /**
   * 리뷰의 개수가 입력값보다 크거나 같은 게시물들을 반환합니다
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: '정수만 입력 가능합니다',
  })
  @Min(1, {
    message: '리뷰 개수 1개 이상부터 검색 가능합니다',
  })
  reviewCount?: number;

  /**
   * 좋아요 개수가 입력값보다 크거나 같은 게시물들을 반환합니다
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: '정수만 입력 가능합니다',
  })
  @Min(1, {
    message: '추천수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  likeCount?: number;

  /**
   * 검색어가 제목, 내용, 작성자에 포함되는 게시물들을 반환합니다
   */
  @IsOptional()
  details?: string[] = [];
}

export class InquiryPostDto {
  /**
   * Deprecated. 호환을 위해 존재합니다.
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  lastId?: number = -1;
}

export class WriteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  language: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  code: string;

  @IsInt({
    message: '라인 정보가 없습니다.',
  })
  lineCount: number;
}
