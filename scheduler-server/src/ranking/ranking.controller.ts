import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('tags')
  getRanking() {
    return this.rankingService.getRanking();
  }

  @Post('tags')
  async saveSearchedTags(@Query('tags') tags: string[]) {
    if (tags.length > 20) {
      throw new BadRequestException('태그의 개수는 20개를 넘을 수 없습니다');
    }
    return await this.rankingService.saveSearchedTags(tags);
  }
}
