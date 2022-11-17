import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, QueryRunner } from 'typeorm';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WriteDto } from './dto/controller-request.dto';

// TODO mock 만들기
const mockRepository = jest.fn(() => ({
  createQueryBuilder: jest.fn(() => ({
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(1),
  })),
}));

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
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository(),
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
});
