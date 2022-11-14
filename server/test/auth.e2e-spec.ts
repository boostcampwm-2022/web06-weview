import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigService } from '@nestjs/config';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('로그아웃', () => {
    return request(app.getHttpServer()).get('/logout').expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
