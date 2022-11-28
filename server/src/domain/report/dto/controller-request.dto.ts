import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportCreateRequestDto {
  @ApiProperty()
  @IsString({
    message: '신고 사유는 문자열만 가능합니다.',
  })
  @MinLength(1, {
    message: '신고 사유를 입력해주세요.',
  })
  reason: string;
}
