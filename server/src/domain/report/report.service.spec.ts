import { Test, TestingModule } from '@nestjs/testing';
import { PostAlreadyReportedException } from 'src/exception/post-already-reported.exception';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { Post } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { ReportCreateRequestDto } from './dto/controller-request.dto';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

describe('신고 서비스', () => {
  let testingModule: TestingModule;
  let reportService: ReportService;
  let reportRepository: ReportRepository;
  let userRepository: UserRepository;
  let postRepository: PostRepository;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: ReportRepository,
          useValue: {},
        },
        {
          provide: PostRepository,
          useValue: {},
        },
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();
  });

  beforeEach(() => {
    reportService = testingModule.get<ReportService>(ReportService);
    reportRepository = testingModule.get<ReportRepository>(ReportRepository);
    postRepository = testingModule.get<PostRepository>(PostRepository);
    userRepository = testingModule.get<UserRepository>(UserRepository);
  });

  describe('신고하기', () => {
    it('존재하지 않는 유저가 신고를 하면 UserNotFoundException이 발생한다.', async () => {
      // given
      const userId = 1;
      const postId = 1;
      const requestDto = new ReportCreateRequestDto();

      userRepository.findOneBy = jest.fn();
      postRepository.findOneBy = jest.fn();

      // when
      try {
        await reportService.report(userId, postId, requestDto);
        throw new Error();
      } catch (err) {
        // then
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('존재하지 않는 포스트에 신고를 하면 PostNotFoundException이 발생한다.', async () => {
      // given
      const userId = 1;
      const postId = 1;
      const requestDto = new ReportCreateRequestDto();

      userRepository.findOneBy = jest.fn(async () => new User());
      postRepository.findOneBy = jest.fn();

      // when
      try {
        await reportService.report(userId, postId, requestDto);
        throw new Error();
      } catch (err) {
        // then
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('신고한 포스트를 다시 신고하면 PostAlreadyReportedException이 발생한다.', async () => {
      // given
      const userId = 1;
      const postId = 1;
      const requestDto = new ReportCreateRequestDto();

      userRepository.findOneBy = jest.fn(async () => new User());
      postRepository.findOneBy = jest.fn(async () => new Post());
      reportRepository.findOneBy = jest.fn();
      reportRepository.insert = jest.fn();

      // when
      try {
        await reportService.report(userId, postId, requestDto);
        reportRepository.findOneBy = jest.fn(async () => new Report());
        await reportService.report(userId, postId, requestDto);
        throw new Error();
      } catch (err) {
        // then
        expect(err).toBeInstanceOf(PostAlreadyReportedException);
        expect(reportRepository.insert).toHaveBeenCalledTimes(1);
      }
    });
  });
});
