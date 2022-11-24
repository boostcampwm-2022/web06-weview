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

const mockUserInfo = {
  email: 'alreadyRegister@naver.com',
  nickname: 'nickname',
  profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
};

describe('Auth E2E', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: ['src/domain/**/*.entity.ts'],
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

    // 해당 메서드만 모킹을 한다.(OAuth가 엮여 복잡)
    jest
      .spyOn(authService, 'getUserInfoUsingGithub')
      .mockImplementation(async () => mockUserInfo);
  });

  describe('인증', () => {
    it('가입하지 않은 유저가 Github 로그인을 한다.', () => {
      return request(app.getHttpServer())
        .get('/auth/github')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.nickname).toBe(mockUserInfo.nickname);
        });
    });

    it('가입하지 않은 또 다른 유저가 Github 로그인을 한다.', async () => {
      await authService.authorize(mockUserInfo);

      const mockUserInfo2 = {
        email: 'email@naver.com',
        nickname: 'nick',
        profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
      };

      // 이번 호출에서만 새로운 유저를 반환하도록 한다.
      jest
        .spyOn(authService, 'getUserInfoUsingGithub')
        .mockImplementationOnce(async () => mockUserInfo2);

      return request(app.getHttpServer())
        .get('/auth/github')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.id).toBe(2);
          expect(res.body.nickname).toBe(mockUserInfo2.nickname);
        });
    });

    it('가입한 유저가 Github 로그인을 한다.', () => {
      return request(app.getHttpServer())
        .get('/auth/github')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.id).toBe(1);
          expect(res.body.nickname).toBe(mockUserInfo.nickname);
        });
    });
  });

  describe('로그아웃', () => {
    let refreshToken;

    beforeAll(() => {
      const { refreshToken: newRefreshToken } = authService.createTokens(1);
      refreshToken = newRefreshToken;
    });

    it('액세스 토큰이 없어도 로그아웃시 성공해야 한다.(204)', () => {
      return request(app.getHttpServer())
        .delete('/auth/logout')
        .expect(HttpStatus.NO_CONTENT);
    });

    it('쿠키에 있던 리프레쉬 토큰이 삭제된다(204)', () => {
      return request(app.getHttpServer())
        .delete('/auth/logout')
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
    let accessToken;
    let refreshToken;

    beforeAll(() => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        authService.createTokens(1);

      accessToken = newAccessToken;
      refreshToken = newRefreshToken;
    });

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
