import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UserInquiryPostDto {
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
}
