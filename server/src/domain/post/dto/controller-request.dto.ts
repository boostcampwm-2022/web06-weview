import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class WriteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsString()
  code: string;

  @IsString()
  language: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsString({ each: true })
  tags: string[];
}

export class InqueryDto {
  @IsOptional()
  @IsInt()
  @Min(-1, {
    message: 'lastId는 -1과 Post의 인덱스만 입력 가능합니다',
  })
  lastId?: number = -1;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  authors?: string[];

  @IsOptional()
  @IsInt({
    message: '정수만 입력 가능합니다',
  })
  @Min(1, {
    message: '리뷰 개수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  reviews?: number;

  @IsOptional()
  @Min(1, {
    message: '추천수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  likes?: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  detail?: string;
}
