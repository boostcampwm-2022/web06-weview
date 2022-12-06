import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class BookmarkCreateRequestDto {
  @IsInt({ message: '글 번호는 숫자만 가능합니다.' })
  @Min(1, {
    message: '글 번호는 양수만 가능합니다.',
  })
  postId: number;
}

export class BookmarkGetAllRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(-1, {
    message: 'lastId는 -1이상이어야 합니다.',
  })
  lastId?: number = -1;
}

export class BookmarkDeleteRequestDto {
  @Type(() => Number)
  @IsInt({ message: '글 번호는 숫자만 가능합니다.' })
  @Min(1, {
    message: '글 번호는 양수만 가능합니다.',
  })
  postId: number;
}
