import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveSearchedTagsDto {
  @ApiProperty({
    description: 'tag들을 콤마로 연결해 입력합니다 ex) java,greedy',
    required: true,
    type: String,
  })
  @IsString({ each: true, message: '태그는 문자여야 합니다' })
  @Length(1, 15, {
    each: true,
    message: '태그의 길이는 1글자에서 15글자까지만 가능합니다 ',
  })
  @ArrayNotEmpty()
  @Transform(({ value }) => value.split(',').map((each) => each.trim()))
  names: string[];
}
