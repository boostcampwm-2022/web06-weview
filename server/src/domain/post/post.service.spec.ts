import { Test, TestingModule } from '@nestjs/testing';
import { WriteDto } from '../post/dto/controller-request.dto';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostToTagRepository } from '../post-to-tag/post-to-tag.repository';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { Category } from './category';
import { TagRepository } from '../tag/tag.repository';
import { UserNotFoundException } from '../../exception/user-not-found.exception';
import { UserRepository } from '../user/user.repository';
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { UserNotSameException } from '../../exception/user-not-same.exception';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';

describe('PostService', () => {
  let service: PostService;
  let postRepository;
  let postToTagRepository;
  let tagRepository;
  let userRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        PostRepository,
        PostToTagRepository,
        UserRepository,
        TagRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
    postToTagRepository = module.get<PostToTagRepository>(PostToTagRepository);
    tagRepository = module.get<TagRepository>(TagRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('게시물 조회', () => {
    const searchCondition: LoadPostListRequestDto = {
      lastId: 1,
      tags: [],
      authors: [],
      category: Category.QUESTION,
      reviews: 1,
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
          isLiked: false,
        },
      ],
      lastId: 6,
      isLast: true,
    };

    beforeEach(async () => {
      // given
      jest
        .spyOn(postRepository, 'findByIdLikesCntGreaterThanOrEqual')
        .mockResolvedValue(resultFilteringLikesCnt);
      jest
        .spyOn(postToTagRepository, 'findByContainingTags')
        .mockResolvedValue(resultFilteringTag);
      jest
        .spyOn(postRepository, 'findBySearchWord')
        .mockResolvedValue(resultFilteringTag);
      jest
        .spyOn(postRepository, 'findByReviewCntGreaterThanOrEqual')
        .mockResolvedValue(resultFilteringTag);
      jest.spyOn(tagRepository, 'findById').mockResolvedValue({ name: 'java' });
    });

    it('마지막 결과값을 포함할 때 isLast는 true가 된다', async () => {
      //given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postListThatHasOnePost);

      //when
      const result = await service.loadPostList(searchCondition);

      //then
      expect(result).toEqual({
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
              profileUrl:
                'https://avatars.githubusercontent.com/u/67636607?v=4',
              email: 'kimth9981@naver.com',
            },
            tags: [],
            isLiked: false,
          },
        ],
        lastId: 6,
        isLast: true,
      });
    });

    it('마지막 결과가 아닐 때 isLast는 false가 된다', async () => {
      //given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue(postListThatHasFourPost);

      // when
      const result = await service.loadPostList(searchCondition);
      // then
      expect(result).toEqual({
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
              profileUrl:
                'https://avatars.githubusercontent.com/u/67636607?v=4',
              email: 'kimth9981@naver.com',
            },
            tags: [],
            isLiked: false,
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
              profileUrl:
                'https://avatars.githubusercontent.com/u/67636607?v=4',
              email: 'kimth9981@naver.com',
            },
            tags: [],
            isLiked: false,
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
              profileUrl:
                'https://avatars.githubusercontent.com/u/67636607?v=4',
              email: 'kimth9981@naver.com',
            },
            tags: [],
            isLiked: false,
          },
        ],
        lastId: 4,
        isLast: false,
      });
    });

    it('검색 결과가 없을 때, post=[], lastId -1 isLast: true 를 반환한다', async () => {
      // given
      jest
        .spyOn(postRepository, 'findByIdUsingCondition')
        .mockResolvedValue([]);

      // when
      const result = await service.loadPostList(searchCondition);

      // then
      expect(result).toEqual({
        posts: [],
        lastId: -1,
        isLast: true,
      });
    });

    it('이미지가 있을때, 결과를 정상적으로 반환한다', async () => {
      // TODO
    });

    it('태그들이 있을 때, 정상적으로 결과를 반환한다', async () => {
      // TODO
    });

    describe('returnPostIdByAllConditionPass 테스트: 여러 조건(좋아요, 태그, 검색어)로 post를 필터링한다', () => {
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
          resultFilteringSearchWord,
        ]);

        expect(result).toBeNull();
      });
    });
  });

  describe('글 작성', () => {
    const writeDto: WriteDto = {
      title: '제목',
      content: '내용',
      code: 'console.log("test")',
      language: 'javascript',
      lineCount: 30,
      category: Category.QUESTION,
      images: [
        'http://localhost:8080/test.png',
        'http://localhost:8080/abc.jpg',
      ],
      tags: ['알고리즘', '정렬'],
    };

    beforeEach(async () => {
      userRepository.findOneBy = jest.fn();
      postRepository.save = jest.fn();
      tagRepository.findOneBy = jest.fn();
      postToTagRepository.save = jest.fn();
    });

    it('글 작성 성공', async () => {
      userRepository.findOneBy = jest.fn(() => new User());
      tagRepository.findOneBy = jest.fn(
        () => new Promise((resolve) => resolve(new Tag())),
      );
      await service.write(1, writeDto);

      expect(postRepository.save).toBeCalledTimes(1);
    });

    it('유저를 찾지 못해서 글 작성 실패', async () => {
      userRepository.findOneBy = jest.fn(() => null);

      try {
        await service.write(1, writeDto);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });
  });

  describe('글 삭제', () => {
    let user;
    let post;

    beforeEach(async () => {
      user = new User();
      post = new Post();

      postRepository.findOne = jest.fn();
      postRepository.deleteUsingPost = jest.fn();
    });

    it('(성공)', async () => {
      user.id = 1;
      user.isDeleted = false;
      post.user = user;
      post.isDeleted = false;

      postRepository.findOne = jest.fn(() => post);

      await service.delete(1, 1);
    });

    it('(실패) user.isDeleted가 true인 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = true;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) user가 undefined인 경우', async () => {
      try {
        user = undefined;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) user가 null인 경우', async () => {
      try {
        user = null;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundException);
      }
    });

    it('(실패) 권한이 존재하지 않는 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = false;
        post.user = user;
        post.isDeleted = false;

        postRepository.findOne = jest.fn(() => post);

        const differentUserId = 2;
        await service.delete(differentUserId, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotSameException);
      }
    });

    it('(실패) post.isDeleted가 true인 경우', async () => {
      try {
        user.id = 1;
        user.isDeleted = false;

        post.user = user;
        post.isDeleted = true;
        postRepository.findOne = jest.fn(() => post);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(실패) post가 undefined인 경우', async () => {
      try {
        postRepository.findOne = jest.fn(() => undefined);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });

    it('(실패) post가 null인 경우', async () => {
      try {
        postRepository.findOne = jest.fn(() => null);
        await service.delete(1, 1);
        throw new Error();
      } catch (err) {
        expect(err).toBeInstanceOf(PostNotFoundException);
      }
    });
  });
});
