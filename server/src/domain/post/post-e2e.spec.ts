import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import * as cookieParser from 'cookie-parser';

describe('Post Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.use(cookieParser());
    app.enableCors({
      origin: [process.env.TARGET_ORIGIN],
      credentials: true,
    });

    await app.init();
  });

  it('(정상)게시물 목록 조회', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts')
      .query({
        lastId: -1,
      })
      .expect(200);

    expect(res.body.posts).not.toBeUndefined();
    expect(res.body.lastId).not.toBeUndefined();
    expect(res.body.isLast).not.toBeUndefined();
    for (const post of res.body.posts) {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('code');
      expect(post).toHaveProperty('language');

      expect(post).toHaveProperty('images');
      for (const image of post.images) {
        expect(image).toHaveProperty('url');
        expect(image).toHaveProperty('name');
      }

      expect(post).toHaveProperty('updatedAt');
      expect(post).toHaveProperty('author');
      expect(post.author).toHaveProperty('id');
      expect(post.author).toHaveProperty('nickname');
      expect(post.author).toHaveProperty('profileUrl');
      expect(post.author).toHaveProperty('email');

      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('reviews');
      expect(post).toHaveProperty('isLiked');
    }
  });

  it('(정상)여러 조건을 넣어 게시물 목록 조회', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts')
      .query({
        lastId: -1,
        tags: '["sort", "greedy"]',
        authors: '["taehoon1229"]',
        category: 'question',
        writtenAnswer: 3,
        scores: 2,
      })
      .expect(200);

    expect(res.body.posts).not.toBeUndefined();
    expect(res.body.lastId).not.toBeUndefined();
    expect(res.body.isLast).not.toBeUndefined();
    for (const post of res.body.posts) {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('code');
      expect(post).toHaveProperty('language');

      expect(post).toHaveProperty('images');
      for (const image of post.images) {
        expect(image).toHaveProperty('url');
        expect(image).toHaveProperty('name');
      }

      expect(post).toHaveProperty('updatedAt');
      expect(post).toHaveProperty('author');
      expect(post.author).toHaveProperty('id');
      expect(post.author).toHaveProperty('nickname');
      expect(post.author).toHaveProperty('profileUrl');
      expect(post.author).toHaveProperty('email');

      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('reviews');
      expect(post).toHaveProperty('isLiked');
    }
  });

  // TODO 카테고리 필수로 처리해야 하는지 고민해보기
  it('(실패)필수 파라미터 lastId 없는 상황', async () => {
    const res = await request(app.getHttpServer()).get('/posts').expect(400);
  });
});
