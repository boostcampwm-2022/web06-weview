import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ReviewWriteRequestDto {
  @IsNotEmpty({ message: '글 정보가 없습니다.' })
  postId: number;

  @IsNotEmpty({ message: '리뷰 내용이 없습니다.' })
  content: string;
}

export class ReviewGetAllRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '글 번호가 형식에 맞지 않습니다.' })
  lastId: number;
}
