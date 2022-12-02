import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { SaveSearchedTagsDto } from './dto/controller-request.dto';
import { TagNameInvalidException } from '../exception/tag-name-invalid.exception';
import { TagDuplicatedException } from '../exception/tag-duplicated.exception';

export const MAX_TAG_COUNT = 10;
export const MIN_TAG_COUNT = 1;
export const TAG_NAME_REGEX = /^[0-9|a-z|A-Z|ㄱ-ㅎ|가-힣]+$/;

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('tags')
  getRanking() {
    return this.rankingService.getRanking();
  }

  @Post('tags')
  async saveSearchedTags(@Query() saveSearchedTagsDto: SaveSearchedTagsDto) {
    try {
      const { names: tags } = saveSearchedTagsDto;
      this.validateTags(tags);

      return await this.rankingService.saveSearchedTags(tags);
    } catch (err) {
      if (err instanceof TagNameInvalidException) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof TagDuplicatedException) {
        throw new BadRequestException(err.message);
      }
    }
  }
  validateTags(tags: string[]) {
    if (tags.length < MIN_TAG_COUNT || tags.length > MAX_TAG_COUNT) {
      throw new BadRequestException('중복되는 태그로 검색할 수 없습니다');
    }
    if (tags.length !== new Set(tags).size) {
      throw new TagDuplicatedException();
    }
    tags.forEach((name) => this.validateTagName(name));
  }

  validateTagName(tagName) {
    if (!TAG_NAME_REGEX.test(tagName)) {
      throw new TagNameInvalidException();
    }
  }
}
