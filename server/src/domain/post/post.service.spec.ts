import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, QueryRunner } from 'typeorm';
import { WriteDto } from '../post/dto/controller-request.dto';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { Category } from './category';
import { TagRepository } from '../tag/tag.repository';

describe('PostService', () => {
  let service: PostService;
  let postRepository;
  let postToTagRepository;
  let tagRepository;

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
        PostRepository,
        PostToTagRepository,
        TagRepository,
        {
          provide: DataSource,
          useClass: MockDatasource,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
    postToTagRepository = module.get<PostToTagRepository>(PostToTagRepository);
    tagRepository = module.get<TagRepository>(TagRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('게시물 조회', () => {
    const dto: LoadPostListRequestDto = {
      lastId: 1,
      tags: ['java'],
      authors: [],
      category: Category.QUESTION,
      writtenAnswer: 1,
      likesCnt: 1,
    };
    const resultFilteringLikesCnt = [
      { postId: 1, likesCnt: '1' },
      { postId: 2, likesCnt: '2' },
    ];
    const resultFilteringTag = [{ postId: 2 }, { postId: 3 }];
    const postListThatHasOnePost = [
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 6,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [2],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
    ];

    const inqueryResultThatIncludeLastValue = {
      posts: [
        {
          id: 6,
          title: 'bubble sort 이렇게 해도 되나요?',
          content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
          code: "console.log('코드가 작성되니다');",
          language: 'java',
          images: [
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
              name: 'js-error',
            },
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
              name: 'suggestions',
            },
          ],
          updatedAt: '2022-11-17T11:41:34.568Z',
          author: {
            id: 1,
            nickname: 'taehoon1229',
            profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
            email: 'kimth9981@naver.com',
          },
          tags: ['java'],
          reviews: [],
          isLiked: true,
        },
      ],
      lastId: 6,
      isLast: true,
    };

    const postListThatHasFourPost = [
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 6,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [2],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 5,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [2],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 4,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [2],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 3,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [2],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
    ];

    const inqueryResultNotIncludeLastValue = {
      posts: [
        {
          id: 6,
          title: 'bubble sort 이렇게 해도 되나요?',
          content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
          code: "console.log('코드가 작성되니다');",
          language: 'java',
          images: [
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
              name: 'js-error',
            },
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
              name: 'suggestions',
            },
          ],
          updatedAt: '2022-11-17T11:41:34.568Z',
          author: {
            id: 1,
            nickname: 'taehoon1229',
            profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
            email: 'kimth9981@naver.com',
          },
          tags: ['java'],
          reviews: [],
          isLiked: true,
        },
        {
          id: 5,
          title: 'bubble sort 이렇게 해도 되나요?',
          content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
          code: "console.log('코드가 작성되니다');",
          language: 'java',
          images: [
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
              name: 'js-error',
            },
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
              name: 'suggestions',
            },
          ],
          updatedAt: '2022-11-17T11:41:34.568Z',
          author: {
            id: 1,
            nickname: 'taehoon1229',
            profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
            email: 'kimth9981@naver.com',
          },
          tags: ['java'],
          reviews: [],
          isLiked: true,
        },
        {
          id: 4,
          title: 'bubble sort 이렇게 해도 되나요?',
          content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
          code: "console.log('코드가 작성되니다');",
          language: 'java',
          images: [
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
              name: 'js-error',
            },
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
              name: 'suggestions',
            },
          ],
          updatedAt: '2022-11-17T11:41:34.568Z',
          author: {
            id: 1,
            nickname: 'taehoon1229',
            profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
            email: 'kimth9981@naver.com',
          },
          tags: ['java'],
          reviews: [],
          isLiked: true,
        },
      ],
      lastId: 4,
      isLast: false,
    };

    //
    const postList = [
      {
        isDeleted: false,
        createdAt: '2022-11-17T11:41:34.568Z',
        updatedAt: '2022-11-17T11:41:34.568Z',
        id: 6,
        category: 'QUESTION',
        title: 'bubble sort 이렇게 해도 되나요?',
        content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
        code: "console.log('코드가 작성되니다');",
        language: 'java',
        user: {
          isDeleted: false,
          createdAt: '2022-11-17T08:01:08.967Z',
          updatedAt: '2022-11-17T08:01:08.967Z',
          id: 1,
          nickname: 'taehoon1229',
          profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
          email: 'kimth9981@naver.com',
        },
        postToTags: [],
        images: [
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 1,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
          },
          {
            isDeleted: false,
            createdAt: '2022-11-17T11:41:34.568Z',
            updatedAt: '2022-11-17T11:41:34.568Z',
            id: 2,
            src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
          },
        ],
      },
    ];

    const inqueryResult = {
      posts: [
        {
          id: 6,
          title: 'bubble sort 이렇게 해도 되나요?',
          content: '이게 맞나 모르겠어요 ㅠㅠㅠ',
          code: "console.log('코드가 작성되니다');",
          language: 'java',
          images: [
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/js-error.png',
              name: 'js-error',
            },
            {
              src: 'https://code.visualstudio.com/assets/docs/nodejs/reactjs/suggestions.png',
              name: 'suggestions',
            },
          ],
          updatedAt: '2022-11-17T11:41:34.568Z',
          author: {
            id: 1,
            nickname: 'taehoon1229',
            profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
            email: 'kimth9981@naver.com',
          },
          tags: [],
          reviews: [],
          isLiked: true,
        },
      ],
      lastId: 6,
      isLast: true,
    };

    beforeEach(async () => {
      // given
      jest
        .spyOn(postRepository, 'findByIdLikesCntGreaterThan')
        .mockResolvedValue(resultFilteringLikesCnt);
      jest
        .spyOn(postToTagRepository, 'findByContainingTags')
        .mockResolvedValue(resultFilteringTag);
      jest
        .spyOn(postRepository, 'findBySearchWord')
        .mockResolvedValue(resultFilteringTag);
      jest.spyOn(tagRepository, 'findById').mockResolvedValue({ name: 'java' });
    });

    it('마지막 결과값을 포함할 때 isLast는 true가 된다', async () => {
      //given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postListThatHasOnePost);

      //when
      const result = await service.loadPostList(dto);

      //then
      expect(result).toEqual(inqueryResultThatIncludeLastValue);
    });

    it('마지막 결과가 아닐 때 isLast는 false가 된다', async () => {
      //given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postListThatHasFourPost);
      // jest.spyOn(tagRepository, 'findById').mockResolvedValue({ name: 'java' });

      // when
      const result = await service.loadPostList(dto);
      // then
      expect(result).toEqual(inqueryResultNotIncludeLastValue);
    });

    it('검색 결과가 없을 때, post=[], lastId -1 isLast: true 를 반환한다', async () => {
      // given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue([]);

      // when
      const result = await service.loadPostList(dto);

      // then
      expect(result).toEqual({
        posts: [],
        lastId: -1,
        isLast: true,
      });
    });

    it('이미지가 없어도, 정상적으로 결과를 반환한다', async () => {
      // TODO
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postList);

      const result = await service.loadPostList(dto);
      expect(result).toEqual(inqueryResult);
    });

    it('글에 태그들이 없어도, 정상적으로 결과를 반환한다', async () => {
      // TODO
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postList);

      const result = await service.loadPostList(dto);
      expect(result).toEqual(inqueryResult);
    });
  });

  describe('게시물 조회 내부에서 여러 조건(좋아요, 태그, 검색어)로 post를 필터링한다', () => {
    it('모든 조건을 다 사용하는 상황 ', () => {
      const resultFilteringLikesCnt = [
        { postId: 1, likesCnt: '1' },
        { postId: 2, likesCnt: '2' },
        { postId: 3, likesCnt: '2' },
      ];
      const resultFilteringTag = [{ postId: 2 }, { postId: 3 }];
      const resultFilteringSearchWord = [{ postId: 2 }, { postId: 3 }];

      const result = service.returnPostIdByAllConditionPass([
        resultFilteringLikesCnt,
        resultFilteringTag,
        resultFilteringSearchWord,
      ]);

      expect(result).toEqual([2, 3]);
    });

    it('하나의 조건을 만족하는 Post가 한 개도 없는 경우', () => {
      const resultFilteringLikesCnt = [
        { postId: 1, likesCnt: '1' },
        { postId: 2, likesCnt: '2' },
        { postId: 3, likesCnt: '2' },
      ];
      const resultFilteringTag = [];
      const resultFilteringSearchWord = [{ postId: 2 }, { postId: 3 }];

      const result = service.returnPostIdByAllConditionPass([
        resultFilteringLikesCnt,
        resultFilteringTag,
        resultFilteringSearchWord,
      ]);

      expect(result).toEqual([]);
    });

    it('하나의 조건을 사용하지 않는 경우(null을 리턴)', () => {
      const resultFilteringLikesCnt = [
        { postId: 1, likesCnt: '1' },
        { postId: 2, likesCnt: '2' },
        { postId: 3, likesCnt: '2' },
      ];
      const resultFilteringTag = [{ postId: 2 }, { postId: 3 }];
      const resultFilteringSearchWord = null;

      const result = service.returnPostIdByAllConditionPass([
        resultFilteringLikesCnt,
        resultFilteringTag,
      ]);

      expect(result).toEqual([2, 3]);
    });

    it('모든 조건을 사용하지 않는 경우', () => {
      const resultFilteringLikesCnt = null;
      const resultFilteringTag = null;
      const resultFilteringSearchWord = null;

      const result = service.returnPostIdByAllConditionPass([
        resultFilteringLikesCnt,
        resultFilteringTag,
      ]);

      expect(result).toBeNull();
    });
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
