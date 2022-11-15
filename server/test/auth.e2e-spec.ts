import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/domain/user/user.entity';
import { Repository } from 'typeorm';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { Post } from '../src/domain/post/post.entity';
import { AuthService } from '../src/domain/auth/auth.service';
import * as cookieParser from 'cookie-parser';

describe('Auth E2E', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Post],
          dropSchema: true,
          logging: true,
          synchronize: true,
        }),
        JwtModule.register({}),
        HttpModule,
      ],
      providers: [Repository<User>],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);

    app.use(cookieParser());
    await app.init();
  });

  describe('로그아웃', () => {
    it('토큰이 없어도 로그아웃시 성공(204)', () => {
      return request(app.getHttpServer()).delete('/logout').expect(204);
    });

    it('쿠키에 있던 리프레쉬 토큰이 삭제된다', () => {
      const { refreshToken } = authService.createTokens(1);

      return request(app.getHttpServer())
        .delete('/logout')
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .expect(204)
        .expect((res) => {
          const header: string = res.get('Set-Cookie')[0];
          const refreshToken = header.match(/refreshToken=(.*?)(?=\;)/)[1];
          expect(refreshToken).toEqual('');
        });
    });
  });

  describe('토큰 갱신', () => {
    it('리프레쉬 토큰이 없으면 갱신시 실패(401)', () => {
      return request(app.getHttpServer()).get('/auth/refresh').expect(401);
    });

    it('리프레쉬 토큰이 있으면 갱신시 쿠키에 refreshToken, 응답으로 accessToken과 expiresIn 반환(200)', () => {
      const { accessToken, refreshToken, expiresIn } =
        authService.createTokens(1);

      return request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .expect(200)
        .expect((res) => {
          const newAccessToken = res.body.accessToken;
          const newExpiresIn = res.body.expiresIn;

          expect(accessToken).not.toEqual(newAccessToken);
          expect(expiresIn).not.toEqual(newExpiresIn);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
