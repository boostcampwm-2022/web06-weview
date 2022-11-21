import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../src/domain/post/post.module';
import { AuthService } from '../src/domain/auth/auth.service';
import { WriteDto } from '../src/domain/post/dto/controller-request.dto';
import { AuthModule } from '../src/domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

describe('Post e2e', () => {
  let app: INestApplication;
  let authService: AuthService;
  let accessToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: ['src/domain/**/*.entity.ts', 'src/domain/*.entity.ts'],
          dropSchema: true,
          synchronize: true,
        }),
        JwtModule.register({}),
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    authService = module.get<AuthService>(AuthService);

    await app.init();

    // 회원가입
    const user = await authService.join(
      'admin@test',
      'nickname',
      'http://localhost:8080/image.png',
    );

    const { accessToken: newAccessToken } = await authService.createTokens(
      user.id,
    );
    accessToken = newAccessToken;
  });

  describe('게시글 작성', () => {
    it('올바른 양식으로 게시글 작성', () => {
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

      request(app.getHttpServer())
        .post('/posts')
        .auth(accessToken, { type: 'bearer' })
        .send(writeDto)
        .expect(HttpStatus.CREATED);
    });

    it('올바르지 않은 양식으로 게시글 작성', () => {
      const writeDto = {
        title: '제목',
        code: 'console.log("test")',
        language: 'javascript',
        category: '리뷰요청',
        images: [
          'http://localhost:8080/test.png',
          'http://localhost:8080/abc.jpg',
        ],
        tags: ['알고리즘', '정렬'],
      };

      request(app.getHttpServer())
        .post('/posts')
        .auth(accessToken, { type: 'bearer' })
        .send(writeDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('게시물 목록 조회', () => {
    it('모든 프로퍼티가 잘 넘어가는지 확인한다', async () => {
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
          search: '어떻게',
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

    it('(정상)검색 조건에서 앞뒤 공백을 제거해주는지 확인한다', async () => {
      const res = await request(app.getHttpServer())
        .get('/posts')
        .query({
          lastId: -1,
          tags: '["sort", "greedy"]',
          authors: '["taehoon1229"]',
          category: 'question',
          writtenAnswer: 3,
          scores: 2,
          search: '           어떻게            ',
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

  afterAll(async () => {
    await app.close();
  });
});
