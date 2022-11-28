import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewWriteRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: '글 정보가 없습니다.' })
  postId: number;

  @ApiProperty()
  @IsNotEmpty({ message: '리뷰 내용이 없습니다.' })
  content: string;
}

export class ReviewGetAllRequestDto {
  @ApiProperty({
    description:
      'lastId를 기준으로 더 최신의 데이터를 반환합니다\nlastId를 입력하지 않으면 가장 최신의 데이터를 반환합니다',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '글 번호가 형식에 맞지 않습니다.' })
  lastId: number;
}
