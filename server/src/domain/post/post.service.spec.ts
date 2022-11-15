import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { rejects } from 'assert';

// TODO mock 만들기
// mock findAll [1,2,3,4,6,7,8,9] 넣기
// findBy(마지막id, 몇개 가져올래)
// Repository 짜야 하는거 아닌가?

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
