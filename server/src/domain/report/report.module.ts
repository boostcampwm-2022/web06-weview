import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserRepository } from '../user/user.repository';
import { PostRepository } from '../post/post.repository';
import { ReportRepository } from './report.repository';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReportRepository, UserRepository, PostRepository],
  exports: [ReportService],
})
export class ReportModule {}
