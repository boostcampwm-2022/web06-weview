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

const mockElasticSearchService = {
  //TODO 위로 옮겨가도 테스트 할때마다 초기화가 될까?
  index: jest.fn(),
  search: jest.fn().mockResolvedValue({
    hits: {
      hits: {},
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

  let post: Post;

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
    post.reviewCount = 0;
    post.likeCount = 0;
  });

  it('should be defined', () => {
    expect(esService).toBeDefined();
  });

  describe('저장', () => {
    it('게시물이 들어오지 않으면 예외를 반환한다', () => {
      expect(() => {
        service.indexPost(null, ['greedy', 'sort']);
      }).toThrow(PostNotFoundException);
    });

    it('게시물이 1개 들어오면 정상적으로 동작한다', () => {
      service.indexPost(post, ['greedy', 'sort']);
      expect(esService.index).toBeCalled();
      // TODO 내부 값 테스트
    });

    it('태그가 0개 들어오면 정상 동작한다', () => {
      service.indexPost(post, []);
      expect(esService.index).toBeCalled();
    });

    it('태그가 1개 들어오면 정상 동작한다', () => {
      service.indexPost(post, ['one']);
      expect(esService.index).toBeCalled();
    });

    it('태그가 5개 들어오면 정상 동작한다', () => {
      service.indexPost(post, ['one', 'two', 'three', 'four', 'five']);
      expect(esService.index).toBeCalled();
    });

    it('중복된 태그가 들어오면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', 'two', 'three', 'two', 'five']),
      ).toThrow(PostInputInvalidException);
    });

    it('태그가 6개 들어오면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', 'two', 'three', 'four', 'five', 'six']),
      ).toThrow(PostInputInvalidException);
    });

    // TODO 태그를 객체로 분리하기
    it('태그 중 10글자까지는 정상 동작한다', () => {
      service.indexPost(post, ['가나다라마바사아자카']);
      expect(esService.index).toBeCalled();
    });

    it('공백만 들어간 태그가 있으면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', '   ', 'three', 'four', 'five']),
      ).toThrow(PostInputInvalidException);
    });

    it('한글, 영대소문자, 숫자, 언더바 이외의 문자(#로 테스트)가 들어간 태그가 있으면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['one', 'two', '#three', 'four']),
      ).toThrow(PostInputInvalidException);
    });

    it('한글, 영대소문자, 숫자, 언더바 이외의 문자가 들어간 태그(공백으로 테스트)가 있으면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, [' one', 'two', 'thre@e', 'four']),
      ).toThrow(PostInputInvalidException);
    });

    it('각 태그에 한글, 영대소문자, 숫자, 언더바만 들어가면 정상 동작한다', () => {
      expect(() =>
        service.indexPost(post, ['한글', '한rD', 'THR22', 'F_ou_r', 'five']),
      ).toThrow(PostInputInvalidException);
    });

    it('각 태그의 시작에 언더바가 있다면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['_한글', '한rD', 'THR22', 'F_ou_r', 'five']),
      ).toThrow(PostInputInvalidException);
    });

    it('각 태그의 끝에 언더바가 있다면 예외를 반환한다', () => {
      expect(() =>
        service.indexPost(post, ['한글_', '한rD', 'THR22', 'F_ou_r', 'five']),
      ).toThrow(PostInputInvalidException);
    });

    // 언더바가 연속으로 들어간 경우 -> 예외

    it('태그 중 10글자를 넘는 값이 있다면 예외를 반환한다', () => {
      expect(() => service.indexPost(post, ['12345678901'])).toThrow(
        PostInputInvalidException,
      );
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
      it('lastId가 없어도, 정상적으로 동작한다', async () => {
        delete searchCondition.lastId;

        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('필터링 조건이 하나도 들어가지 않을 때 정상적으로 동작한다', async () => {
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        expect(esService.search).toBeCalledWith(searchConditionUsingES);
      });

      it('tags가 한 개 들어왔을 때, 정상 출력한다', async () => {
        //given
        searchCondition.tags = ['one'];
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          match: {
            tags: {
              query: 'one',
              operator: 'AND',
            },
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
        searchConditionUsingES.body.query.bool.filter.bool.must.push({
          match: {
            tags: {
              query: ['one', 'two', 'three', 'four', 'five'].join(' '),
              operator: 'AND',
            },
          },
        });

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
        } catch (err) {
          //then
          expect(err).toBeInstanceOf(SearchParamInvalidException);
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
            query: searchCondition.details,
            fields: ['title', 'content', 'code', 'language', 'authorNickname'],
          },
        });

        //when
        await service.search(searchCondition);

        expect(esService.search).toBeCalled();
        expect(esService.search).toBeCalledWith(searchConditionUsingES);
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
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });

      it('likeCount가 음수면, 예외를 반환한다', async () => {
        try {
          //given
          searchCondition.likeCount = -1;
          //when
          await service.search(searchCondition);
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
        } catch (err) {
          expect(err).toBeInstanceOf(SearchParamInvalidException);
        }
      });
    });
  });
});
