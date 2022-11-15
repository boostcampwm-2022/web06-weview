import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, QueryRunner } from 'typeorm';
import { WriteDto } from '../auth/dto/controller-request.dto';
import { PostService } from './post.service';
import { rejects } from 'assert';

// TODO mock 만들기
// mock findAll [1,2,3,4,6,7,8,9] 넣기
// findBy(마지막id, 몇개 가져올래)
// Repository 짜야 하는거 아닌가?

describe('PostService', () => {
  let service: PostService;

  const qr = {
    manager: {},
  } as QueryRunner;

  class MockDatasource {
    createQueryRunner(): QueryRunner {
      return qr;
    }
  }

  beforeEach(async () => {
    qr.connect = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: DataSource,
          useClass: MockDatasource,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  describe('글 작성', () => {
    Object.assign(qr.manager, {
      save: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn((entity) => new entity()),
    });

    const writeDto: WriteDto = {
      title: '제목',
      content: '내용',
      code: 'console.log("test")',
      language: 'javascript',
      category: '리뷰요청',
      images: [
        'http://localhost:8080/test.png',
        'http://localhost:8080/abc.jpg',
      ],
      tags: ['알고리즘', '정렬'],
    };

    it('글 작성 성공', async () => {
      await service.write(1, writeDto);

      expect(qr.commitTransaction).toBeCalledTimes(1);
    });

    it('처음 작성된 태그로 글 작성', async () => {
      qr.manager.findOneBy = jest.fn(() => null);
      await service.write(1, writeDto);

      expect(qr.commitTransaction).toBeCalledTimes(1);
    });

    it('글 작성 실패', async () => {
      qr.manager.save = jest.fn(() => {
        throw new Error();
      });

      try {
        await service.write(1, writeDto);
      } catch (err) {
        expect(err.message).toEqual('글 작성에 실패했습니다.');
        expect(qr.rollbackTransaction).toBeCalledTimes(1);
        expect(qr.release).toBeCalledTimes(1);
      }
    });
  });

  describe('mock db에 [1,2,3,4,6,7,8,9] 가 있을 때', () => {
    it('lastId: -1(최신), size: 3으로 조회하면  9,8,7 반환한다', () => {
      const postList: number[] = service.loadPostList(-1, 3); // 9,8,7 (가장 끝부터 3개 조회)
      expect(postList).toContain(9);
      expect(postList).toContain(8);
      expect(postList).toContain(7);
      expect(postList.length).toBe(3);
    });

    it('lastId: 7, size: 3으로 조회하면  6,4,3 반환한다', () => {
      const postList: number[] = service.loadPostList(7, 3); // 6,4,3
      expect(postList).toContain(6);
      expect(postList).toContain(4);
      expect(postList).toContain(3);
      expect(postList.length).toBe(3);
    });

    it('lastId: 3, size: 3으로 조회하면  2,1 반환한다', () => {
      const postList: number[] = service.loadPostList(3, 3); // 2,1 반환한다
      // 3개 조회했는데 -> 3개 아님. -> 게시물 + 댓글 목록 and isLast = true
      expect(postList).toContain(2);
      expect(postList).toContain(1);
      expect(postList.length).toBe(3);
    });

    it('lastId가 -1보다 작은 값이 들어가면 예외를 반환한다', () => {
      expect(() => service.loadPostList(-2, 3)).rejects.toThrowError();
    });

    it('lastId가 db에 없는 매우 큰 값이 들어가면 예외를 반환한다', () => {
      expect(() => service.loadPostList(11, 3)).rejects.toThrowError();
    });
  });
});
