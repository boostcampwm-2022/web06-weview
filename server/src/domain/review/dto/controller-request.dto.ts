import { IsNotEmpty } from 'class-validator';

export class ReviewWriteRequestDto {
  @IsNotEmpty({ message: '글 정보가 없습니다.' })
  postId: number;

  @IsNotEmpty({ message: '리뷰 내용이 없습니다.' })
  content: string;
}
