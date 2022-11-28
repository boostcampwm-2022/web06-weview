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
  @ApiProperty({
    description:
      'lastId를 기준으로 더 최신의 데이터를 반환합니다\nlastId를 입력하지 않으면 가장 최신의 데이터를 반환합니다',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-1, {
    message: 'lastId는 -1과 Post의 인덱스만 입력 가능합니다',
  })
  lastId?: number = -1;

  @ApiProperty({
    description: '카테고리는 사전에 지정되어 있습니다',
    required: false,
  })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'tag들을 콤마로 연결해 입력합니다 ex) java,greedy',
    required: false,
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((each) => each.trim()))
  tags?: string[] = [];

  @ApiProperty({
    description: '사용자들을 콤마로 연결해 입력합니다 ex) taehoon1229,WOOSERK',
    required: false,
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => value.split(',').map((each) => each.trim()))
  authors?: string[] = [];

  @ApiProperty({
    description: '리뷰의 개수가 입력값보다 크거나 같은 게시물들을 반환합니다',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: '정수만 입력 가능합니다',
  })
  @Min(1, {
    message: '리뷰 개수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  reviews?: number;

  @ApiProperty({
    description: '좋아요 개수가 입력값보다 크거나 같은 게시물들을 반환합니다',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1, {
    message: '추천수 1개 이상부터 검색 가능합니다',
  }) //0인 경우는 해당 옵션을 쓸 필요가 없음
  likes?: number;

  @ApiProperty({
    description: '제목, 내용에 해당 검색어가 있는 게시물들을 반환합니다',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  detail?: string;
}

export class WriteDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ description: '카테고리는 사전에 지정되어 있습니다' })
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'code가 몇 줄로 구성되는지 보내줍니다' })
  @IsInt({
    message: '라인 정보가 없습니다.',
  })
  lineCount: number;
}
