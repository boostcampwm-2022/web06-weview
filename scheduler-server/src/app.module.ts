import { Module } from '@nestjs/common';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [RankingModule],
  providers: [],
})
export class AppModule {}
