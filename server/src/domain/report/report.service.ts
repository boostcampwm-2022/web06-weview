import { Injectable } from '@nestjs/common';
import { PostAlreadyReportedException } from 'src/exception/post-already-reported.exception';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { PostNotReportedException } from 'src/exception/post-not-reported.exception';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';
import { ReportCreateRequestDto } from './dto/controller-request.dto';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private reportRepository: ReportRepository,
  ) {}

  async report(
    userId: number,
    postId: number,
    { reason }: ReportCreateRequestDto,
  ) {
    try {
      const userEntity = await this.userRepository.findOneBy({
        id: userId,
        isDeleted: false,
      });
      if (!userEntity) {
        throw new UserNotFoundException();
      }

      const postEntity = await this.postRepository.findOneBy({
        id: postId,
        isDeleted: false,
      });
      if (!postEntity) {
        throw new PostNotFoundException();
      }
      const report = new Report();
      report.user = userEntity;
      report.post = postEntity;
      report.reason = reason;

      const existReport = await this.reportRepository.findOneBy({
        postId,
        userId,
      });

      if (existReport) {
        throw new PostAlreadyReportedException();
      }

      await this.reportRepository.insert(report);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw err;
      } else if (err instanceof PostNotFoundException) {
        throw err;
      } else if (err instanceof PostAlreadyReportedException) {
        throw err;
      } else {
        throw new PostNotReportedException();
      }
    }
  }
}
