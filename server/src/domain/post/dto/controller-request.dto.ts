import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InqueryDto {
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

  @ApiProperty({
    description: 'tag들을 콤마로 연결해 입력합니다 ex) java,greedy',
    required: false,
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((each) => each.trim()))
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
  @Min(1, {
    message: '추천수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  likeCount?: number;

  /**
   * 검색어가 제목, 내용, 작성자에 포함되는 게시물들을 반환합니다
   */
  @ApiProperty({
    description:
      '검색어를 콤마로 연결해 입력합니다 ex) 이거 어떻게 풀어요,taehoon1229',
    required: false,
    type: String,
  })
  @IsOptional()
  @Transform(
    ({ value }) =>
      value
        .split(',')
        .map((each) => each.trim())
        .filter((each) => each.length != 0), // ,, 붙어 있는 경우 배열에서 ''로 저장되는 경우를 제거
  )
  details?: string[] = [];
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
