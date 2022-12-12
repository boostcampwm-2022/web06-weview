import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PostSearchService } from './post-search.service';
import { LoadPostListRequestDto } from './dto/service-request.dto';

const mockElasticSearchService = {
  index: jest.fn(),
  search: jest.fn(),
};
const mockConfigService = {
  get: jest.fn(),
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
    it('게시물이 들어오지 않으면 예외를 반환한다', () => {
      //
    });

    it('게시물이 1개 들어오면 정상적으로 동작한다', () => {
      //
    });

    it('게시물이 1개 넘게 들어오면 예외를 반환한다', () => {
      //
    });

    it('태그가 0개 들어오면 정상 동작한다', () => {
      //
    });

    it('태그가 1개 들어오면 정상 동작한다', () => {
      //
    });

    it('태그가 5개 들어오면 정상 동작한다', () => {
      //
    });

    it('태그가 6개 들어오면 예외를 반환한다', () => {
      //
    });
  });

  describe('검색', () => {
    let searchCondition: LoadPostListRequestDto;
    beforeEach(() => {
      searchCondition = {
        lastId: 1,
        tags: [],
        reviewCount: 1,
        likeCount: 1,
        details: [],
      };
    });

    describe('입력값 검증', () => {
      it('lastId가 없어도, 정상적으로 동작한다', async () => {
        //
      });

      it('tags가 비어 있을 때, 정상 출력한다', async () => {
        //
      });

      it('tags가 한 개 들어왔을 때, 정상 출력한다', async () => {
        //
      });

      it('tags가 다섯 개 들어왔을 때, 정상 출력한다', async () => {
        //
      });

      it('tags가 여섯 개 들어왔을 때, 예외를 반환한다', async () => {
        //
      });

      it('tags가 여섯 개 들어왔을 때, 예외를 반환한다', async () => {
        //
      });
      it('details가 비어있을 때, 정상 출력한다', async () => {
        //
      });

      it('details가 1개일 때, 정상 출력한다', async () => {
        //
      });

      it('details가 1개를 넘어가면, 예외를 반환한다', async () => {
        //
      });

      it('reviewCount가 음수면, 예외를 반환한다', async () => {
        //
      });

      it('reviewCount가 20보다 크면, 예외를 반환한다', async () => {
        //
      });

      it('likesCount가 음수면, 예외를 반환한다', async () => {
        //
      });

      it('likesCount가 20보다 크면, 예외를 반환한다', async () => {
        //
      });
    });
    describe('결과값 검증', () => {
      it('검색결과가 id로 오름차순 정렬되었을 때, 정상 출력한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('검색결과가 id로 오름차순 정렬되지 않았을 때, 예외를 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('N+1개의 결과가 오면, posts를 3개 반환하고 isLast를 false로 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('N개의 결과가 오면, posts를 N개 반환하고 isLast를 true로 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('0개의 결과가 오면, posts를 0개 반환하고 isLast를 true로 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('N+1개 보다 많은 결과가 오면, 예외를 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });

      it('결과값에 중복되는 아이디가 있으면 예외를 반환한다', async () => {
        //given

        //when
        const result = await service.search(searchCondition);

        //then
      });
    });
  });
});
