import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../src/domain/auth/auth.service';
import * as cookieParser from 'cookie-parser';

describe('Auth E2E', () => {
  let app: INestApplication;
  let authService: AuthService;
  let accessToken: string;
  let refreshToken: string;

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
          entities: ['src/domain/**/*.entity.ts', 'src/domain/*.entity.ts'],
          dropSchema: true,
          synchronize: true,
        }),
        JwtModule.register({}),
        HttpModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);

    app.use(cookieParser());
    await app.init();

    // 회원가입
    const user = await authService.join(
      'admin@test',
      'nickname',
      'http://localhost:8080/image.png',
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await authService.createTokens(user.id);
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
  });

  describe('로그아웃', () => {
    it('토큰이 없어도 로그아웃시 성공(204)', () => {
      return request(app.getHttpServer())
        .delete('/logout')
        .expect(HttpStatus.NO_CONTENT);
    });

    it('쿠키에 있던 리프레쉬 토큰이 삭제된다(204', () => {
      return request(app.getHttpServer())
        .delete('/logout')
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .expect(HttpStatus.NO_CONTENT)
        .expect((res) => {
          const header: string = res.get('Set-Cookie')[0];
          const refreshToken = header.match(/refreshToken=(.*?)(?=\;)/)[1];
          expect(refreshToken).toEqual('');
        });
    });
  });

  describe('토큰 갱신', () => {
    it('리프레쉬 토큰이 없으면 갱신시 실패(401)', () => {
      return request(app.getHttpServer())
        .get('/auth/refresh')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('리프레쉬 토큰이 있으면 갱신시 쿠키에 refreshToken, 응답으로 accessToken과 expiresIn 반환(200)', () => {
      return request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', [`refreshToken=${refreshToken}`])
        .expect(HttpStatus.OK)
        .expect((res) => {
          const newAccessToken = res.body.accessToken;

          expect(accessToken).not.toEqual(newAccessToken);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
