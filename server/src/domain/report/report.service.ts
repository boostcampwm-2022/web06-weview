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
    const userEntityPromise = this.userRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });

    const postEntityPromise = this.postRepository.findOneBy({
      id: postId,
      isDeleted: false,
    });

    const [userEntity, postEntity] = await Promise.all([
      userEntityPromise,
      postEntityPromise,
    ]);

    if (!userEntity) {
      throw new UserNotFoundException();
    }

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
  }
}
