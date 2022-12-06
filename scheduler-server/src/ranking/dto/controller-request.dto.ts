import { ArrayNotEmpty, IsString, Length } from 'class-validator';

export class SaveSearchedTagsDto {
  @ArrayNotEmpty()
  @IsString({ each: true, message: '태그는 문자여야 합니다' })
  @Length(1, 15, {
    each: true,
    message: '태그의 길이는 1글자에서 15글자까지만 가능합니다 ',
  })
  tags: string[];
}
