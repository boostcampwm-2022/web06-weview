import { Test, TestingModule } from '@nestjs/testing';
import { PostNotFoundException } from 'src/exception/post-not-found.exception';
import { UserNotFoundException } from 'src/exception/user-not-found.exception';
import { Post } from '../post/post.entity';
import { PostRepository } from '../post/post.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import {
  ReviewGetAllRequestDto,
  ReviewWriteRequestDto,
} from './dto/controller-request.dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

describe('리뷰 서비스', () => {
  let testingModule: TestingModule;
  let reviewService: ReviewService;
  let reviewRepository: ReviewRepository;
  let postRepository: PostRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: ReviewRepository,
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
    reviewService = testingModule.get<ReviewService>(ReviewService);
    reviewRepository = testingModule.get<ReviewRepository>(ReviewRepository);
    postRepository = testingModule.get<PostRepository>(PostRepository);
    userRepository = testingModule.get<UserRepository>(UserRepository);
  });

  describe('리뷰 작성', () => {
    it('존재하지 않는 유저가 리뷰를 작성하면 UserNotFoundException이 발생한다.', async () => {
      // given
      const dto: ReviewWriteRequestDto = {
        postId: 1,
        content: '내용',
      };
      const userId = 1;

      userRepository.findOneBy = jest.fn(() => null);
      postRepository.findOneBy = jest.fn();

      // when
      try {
        await reviewService.write(userId, dto);
        throw new Error();
      } catch (err) {
        // then
        expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('존재하지 않는 포스트에 리뷰를 작성하면 PostNotFoundException이 발생한다.', async () => {
      // given
      const dto: ReviewWriteRequestDto = {
        postId: 1,
        content: '내용',
      };
      const userId = 1;

      userRepository.findOneBy = jest.fn(async () => new User());
      postRepository.findOneBy = jest.fn(() => null);

      // when
      try {
        await reviewService.write(userId, dto);
        throw new Error();
      } catch (err) {
        expect(postRepository.findOneBy).toHaveBeenCalledTimes(1);
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('유저 정보와 포스트 정보로 리뷰 작성에 성공한다.', async () => {
      // given
      const dto: ReviewWriteRequestDto = {
        postId: 1,
        content: '내용',
      };
      const userId = 1;

      userRepository.findOneBy = jest.fn(async () => new User());
      postRepository.findOneBy = jest.fn(async () => new Post());
      postRepository.increaseReviewCount = jest.fn(async () => new Post());
      reviewRepository.insert = jest.fn();

      // when
      await reviewService.write(userId, dto);

      // then
      expect(reviewRepository.insert).toHaveBeenCalledTimes(1);
    });
  });

  describe('리뷰 목록 조회', () => {
    const REQUEST_CNT = 3;
    it('리뷰를 한 번에 최대 REQUEST_CNT개까지 반환한다.', async () => {
      // given
      const reviews = Array.from({ length: REQUEST_CNT + 1 }, (v, i) => {
        const review = new Review();
        review.id = i + 1;
        review.user = new User();
        return review;
      });
      const postId = 1;
      const requestDto = new ReviewGetAllRequestDto();

      reviewRepository.find = jest.fn(async () => reviews);

      // when
      const dtos = await reviewService.getReviewsOfPost(postId, requestDto);

      // then
      expect(dtos.reviews.length).toEqual(REQUEST_CNT);
      expect(dtos.isLast).toEqual(false);
    });

    it('리뷰가 요청한 개수보다 적거나 같으면 isLast가 true다.', async () => {
      // given
      const reviews = Array.from({ length: REQUEST_CNT }, (v, i) => {
        const review = new Review();
        review.id = i + 1;
        review.user = new User();
        return review;
      });
      const postId = 1;
      const requestDto = new ReviewGetAllRequestDto();

      reviewRepository.find = jest.fn(async () => reviews);

      // when
      const dtos = await reviewService.getReviewsOfPost(postId, requestDto);

      // then
      expect(dtos.lastId).toEqual(dtos.reviews[dtos.reviews.length - 1].id);
      expect(dtos.isLast).toEqual(true);
    });

    it('리뷰가 없으면 isLast가 true다.', async () => {
      // given
      const postId = 1;
      const requestDto = new ReviewGetAllRequestDto();

      reviewRepository.find = jest.fn();

      // when
      const dtos = await reviewService.getReviewsOfPost(postId, requestDto);

      // then
      expect(dtos.reviews.length).toEqual(0);
      expect(dtos.isLast).toEqual(true);
    });
  });
});
