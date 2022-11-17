import { INestApplication, HttpStatus } from '@nestjs/common';
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

  afterAll(async () => {
    await app.close();
  });
});
