import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class SaveSearchedTagsDto {
  @IsString({ each: true, message: '태그는 문자여야 합니다' })
  @Length(1, 15, {
    each: true,
    message: '태그의 길이는 1글자에서 15글자까지만 가능합니다 ',
  })
  @ArrayNotEmpty()
  @Transform(({ value }) => value.split(',').map((each) => each.trim()))
  names: string[];
}
