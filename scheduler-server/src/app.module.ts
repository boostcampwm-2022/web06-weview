import { Module } from '@nestjs/common';
import { RankingModule } from './ranking/ranking.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    RankingModule,
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: 'authpassword',
      },
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
