import { Module } from '@nestjs/common';
import { RankingModule } from './ranking/ranking.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [RankingModule, ScheduleModule.forRoot()],
})
export class AppModule {}
