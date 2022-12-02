import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRedisToken, RedisModule } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { AppModule } from '../src/app.module';
import { RankingService } from '../src/ranking/ranking.service';
import { TagCountInvalidException } from '../src/exception/tag-count-invalid.exception';

describe('Ranking E2E', () => {
  let app: INestApplication;
  let rankingService: RankingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: 'localhost',
            port: 6379,
            password: 'authpassword',
          },
        }),
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();
    rankingService = module.get<RankingService>(RankingService);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );
    await app.init();
  });

  describe('/ranking/tags (GET)', () => {
    it('아무 데이터도 없을 때 200, 빈 배열을 반환한다', () => {
      return request(app.getHttpServer())
        .get('/ranking/tags')
        .expect(200)
        .expect([]);
    });
  });

  describe('/ranking/tags (POST)', () => {
    it('아무 태그도 보내지 않으면 400번 예외를 반환한다', () => {
      return request(app.getHttpServer()).post('/ranking/tags').expect(400);
    });

    it('10개가 넘는 태그를 보내면 400번 예외를 반환한다', () => {
      return request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: '1,2,3,4,5,6,7,8,9,10,11' })
        .expect(400);
    });

    it('태그가 중복되면 400번 예외를 반환한다', () => {
      return request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: '1,2,3,2,6' })
        .expect(400);
    });

    it('태그 이름에 특수문자가 들어가면 400번 예외를 반환한다', () => {
      return request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: '1,2,3,2@3,6' })
        .expect(400);
    });

    it('태그 이름 내부에 공백이 들어가면 400번 예외를 반환한다', () => {
      return request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: '1,2,3,2,2 3,6' })
        .expect(400);
    });

    it('정상적인 입력이 오면 201을 반환한다', () => {
      return request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: 'java,javascript' })
        .expect(201);
    });

    // TODO 불완전한 테스트라고 느껴짐. 만약 첫번째, 두번째 요청이 끝나고 cron 실행되고 3,4 요청을 보내게 되면 결과가 달라질 수 있음.
    //  CRON을 어떻게 테스트 해야할지 고민해보기
    it('자바스크립트 4번, 자바 1번, 파이썬 1번 검색된 경우, javascript:0, java:0, python:0을 반환한다', async () => {
      await request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: 'python,javascript' });
      await request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: 'javascript,java' });
      await request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: 'javascript' });
      await request(app.getHttpServer())
        .post('/ranking/tags')
        .query({ names: 'javascript' });
      await rankingService.updateRanking();

      return request(app.getHttpServer())
        .get('/ranking/tags')
        .expect(200)
        .expect([
          {
            name: 'javascript',
            prev: 0,
          },
          {
            name: 'java',
            prev: 0,
          },
          {
            name: 'python',
            prev: 0,
          },
        ]);
    });
  });
});
