import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PostSearchService } from './post-search.service';
import { LoadPostListRequestDto } from './dto/service-request.dto';
import { Post } from './post.entity';
import { User } from '../user/user.entity';
import { PostNotFoundException } from '../../exception/post-not-found.exception';
import { PostInputInvalidException } from '../../exception/post-input-invalid.exception';
import { SEND_POST_CNT } from './post.controller';
import { SearchParamInvalidException } from '../../exception/search-param-invalid.exception';
import { SearchResponseInvalidException } from '../../exception/search-response-invalid.exception';
import { TagInvalidException } from '../../exception/tag-invalid.exception';

const mockElasticSearchService = {
  index: jest.fn(),
  search: jest.fn().mockResolvedValue({
    hits: {
      hits: [],
    },
  }),
};
const mockConfigService = {
  get: jest.fn(() => '엘라스틱_인덱스명'),
};

describe('PostSearchService', () => {
  let service: PostSearchService;
  let esService: ElasticsearchService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostSearchService,
        ElasticsearchService,
        ConfigService,
        {
          provide: ElasticsearchService,
          useValue: mockElasticSearchService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();
    service = module.get<PostSearchService>(PostSearchService);
    esService = module.get<ElasticsearchService>(ElasticsearchService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(esService).toBeDefined();
  });

  describe('저장', () => {
    let post: Post;
    let indexParameter;

    beforeEach(async () => {
      const user = new User();
      user.id = 10;
      user.nickname = '사용자이름';

      post = new Post();
      post.id = 1;
      post.title = '제목';
      post.content = 'content';
      post.code = 'System.out.println("zz")';
      post.language = 'java';
      post.createdAt = new Date();
      post.updatedAt = new Date();
      post.user = user;
      post.lineCount = 1;
      post.reviewcount = 0;
      post.likecount = 0;

      indexParameter = {
        index: configService.get(''),
        id: String(post.id),
        body: {
          id: post.id,
          title: post.title,
          content: post.content,
          code: post.code,
          language: post.language,
          createdat: post.createdAt,
          updatedat: post.updatedAt,
          userid: post.user.id,
          usernickname: post.user.nickname,
          linecount: post.lineCount,
          reviewcount: post.reviewcount,
          likecount: post.likecount,
        },
      };
    });
    it('게시물이 들어오지 않으면 예외를 반환한다', () => {
      expect(() => {
        service.indexPost(null, ['greedy', 'sort']);
      }).toThrow(PostNotFoundException);
    });

    it('게시물이 1개 들어오면 정상적으로 동작한다', () => {
      //given
      const tags = ['greedy', 'sort'];

      //when
      service.indexPost(post, tags);
      indexParameter.body.tags = tags.join(' ');

      expect(esService.index).toBeCalled();
      expect(esService.index).toBeCalledWith(indexParameter);
    });

    it('태그가 0개 들어오면 정상 동작한다', () => {
      service.indexPost(post, []);
      indexParameter.body.tags = ''; // 비어있는 값일 때 ''가 들어간다

      expect(esService.index).toBeCalled();
      expect(esService.index).toBeCalledWith(indexParameter);
    });

    it('태그가 1개 들어오면 정상 동작한다', () => {
      //given
      const tags = ['one'];
      indexParameter.body.tags = tags[0];
      //when
      service.indexPost(post, tags);

      expect(esService.index).toBeCalled();
      expect(esService.index).toBeCalledWith(indexParameter);
    });

    it('태그가 5개 들어오면 정상 동작한다', () => {
      const tags = ['one', 'two', 'three', 'four', 'five'];
      indexParameter.body.tags = tags.join(' ');

      service.indexPost(post, tags);

      expect(esService.index).toBeCalled();
      expect(esService.index).toBeCalledWith(indexParameter);
    });

    it('중복된 태그가 들어오면 중복을 제거하고 저장한다', () => {
      //given
      const tagsRemovedDuplicate = Array.from(
        new Set(['one', 'two', 'three', 'two', 'five']),
      );
      indexParameter.body.tags = tagsRemovedDuplicate.join(' ');

      //when
      service.indexPost(post, ['one', 'two', 'three', 'two', 'five']);
      expect(esService.index).toBeCalledWith(indexParameter);
    });

    it('태그가 6개 들어오면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', 'two', 'three', 'four', 'five', 'six']),
      ).toThrow(PostInputInvalidException);
    });

    it('태그 하나의 글자수가 30개면 정상 동작한다', () => {
      service.indexPost(post, [
        '부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프',
      ]);
      expect(esService.index).toBeCalled();
    });

    it('태그 하나의 글자수가 31개면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, [
          'one',
          '부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프1',
          'three',
          'four',
          'five',
        ]),
      ).toThrow(TagInvalidException);
    });

    it('아무 값도 들어있지 않은 태그가 있으면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', '   ', 'three', 'four', 'five']),
      ).toThrow(TagInvalidException);
    });

    it('공백이 포함된 태그가 있으면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, [' one', 'two', 'thre e', 'four']),
      ).toThrow(TagInvalidException);
    });
  });

  describe('검색', () => {
    let searchCondition: LoadPostListRequestDto;
    let searchConditionUsingES;

    beforeEach(() => {
      searchConditionUsingES = {
        sort: [
          {
            id: {
              order: 'DESC',
            },
          },
        ],
        size: SEND_POST_CNT + 1,
        index: configService.get(''),
        body: {
          query: {
            bool: {
              filter: {
                bool: {
                  must: [],
                },
              },
            },
          },
        },
      };

      searchCondition = {
        lastId: -1,
        tags: [],
        reviewCount: 0,
        likeCount: 0,
        details: [],
      };
    });

    describe('입력값 검증', () => {
      it('tags가 한 개 들어왔을 때, 정상 출력한다', async () => {
        //given
        searchCondition.tags = ['one'];
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          match: {
            tags: 'one',
          },
        });

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('tags가 다섯 개 들어왔을 때, 정상 출력한다', async () => {
        //given
        searchCondition.tags = ['one', 'two', 'three', 'four', 'five'];
        for (const tag of searchCondition.tags) {
          searchConditionUsingES.body.query.bool.filter.bool.must.push({
            match: {
              tags: tag,
            },
          });
        }

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('tags가 여섯 개 들어왔을 때, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.tags = ['one', 'two', 'three', 'four', 'five', 'six'];

          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          //then
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      it('태그 하나의 글자수가 30개면 정상 동작한다', async () => {
        //given
        searchCondition.tags = [
          '부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프',
        ];

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
      });

      it('태그 하나의 글자수가 31개면 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.tags = [
            '부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프부스트캠프1',
          ];

          //when
          await service.search(searchCondition);
          console.log('rerererer', searchCondition);
          throw new Error();
        } catch (err) {
          //then
          expect(err).toBeInstanceOf(TagInvalidException);
        }
      });

      it('아무 값도 들어있지 않은 태그가 있으면 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.tags = ['one', '   ', 'three', 'four', 'five'];

          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          //then
          expect(err).toBeInstanceOf(TagInvalidException);
        }
      });

      it('공백이 포함된 태그가 있으면 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.tags = [' one', 'two', 'thre e', 'four'];

          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          //then
          expect(err).toBeInstanceOf(TagInvalidException);
        }
      });

      it('details에 공백이 넘어올 때, 정상 출력한다', async () => {
        //TODO 놓친 케이스. 프론트에서 막아줄건지, 백엔드에서 무시할건지 이야기
      });

      it('details가 1개일 때, 정상 출력한다', async () => {
        //given
        searchCondition.details = ['hello my name is taehoon kim'];
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          multi_match: {
            query: searchCondition.details[0],
            fields: ['title', 'content', 'code', 'language', 'authorNickname'],
          },
        });

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        // expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      // TODO 검색어 길이 제한

      it('details가 1개를 넘어가면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.details = [
            'hello my name is taehoon kim',
            'second value',
          ];
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      //ddd
      it('reviewCount가 음수면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.reviewCount = -1;
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      it('reviewCount가 20보다 크면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.reviewCount = 21;
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      it('reviewCount가 1개일 때 정상 출력한다', async () => {
        //given
        searchCondition.reviewCount = 1;
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          range: {
            reviewCount: {
              gte: searchCondition.reviewCount,
            },
          },
        });

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        // expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('likeCount 1개일 때 정상 출력한다', async () => {
        //given
        searchCondition.likeCount = 1;
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          range: {
            likeCount: {
              gte: searchCondition.likeCount,
            },
          },
        });

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        // expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('likeCount가 음수면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.likeCount = -1;
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      it('likeCount가 20보다 크면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.likeCount = 21;
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });
    });

    describe('결과값 검증', () => {
      it('결과값은 내림차순으로 정렬되어진다', async () => {
        //given
        mockElasticSearchService.search = jest.fn().mockResolvedValue({
          hits: {
            hits: [
              { _source: { id: 3 } },
              { _source: { id: 2 } },
              { _source: { id: 10 } },
            ],
          },
        });
        //when
        const result = await service.search(searchCondition);

        //then
        expect(result).toStrictEqual([
          { _source: { id: 10 } },
          { _source: { id: 3 } },
          { _source: { id: 2 } },
        ]);
      });

      it('N+1개 보다 많은 결과가 오면, 예외를 반환한다', async () => {
        try {
          mockElasticSearchService.search = jest.fn().mockResolvedValue({
            hits: {
              hits: [
                { _source: { id: 5 } },
                { _source: { id: 4 } },
                { _source: { id: 3 } },
                { _source: { id: 2 } },
                { _source: { id: 1 } },
              ],
            },
          });
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchResponseInvalidException);
        }
      });

      it('결과값에 중복되는 아이디가 있으면 예외를 반환한다', async () => {
        try {
          mockElasticSearchService.search = jest.fn().mockResolvedValue({
            hits: {
              hits: [
                { _source: { id: 3 } },
                { _source: { id: 1 } },
                { _source: { id: 1 } },
              ],
            },
          });
          //when
          await service.search(searchCondition);
          throw new Error();
        } catch (err) {
          expect(err).toBeInstanceOf(SearchResponseInvalidException);
        }
      });
    });
  });
});
