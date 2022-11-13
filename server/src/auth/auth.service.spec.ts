import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

// TODO 의문 : 서비스 계층 테스트를 할 때 Repository를 Mocking 해야하나?
//  Mocking에 대해 학습해보기

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('email을 통해 조회한 결과가 있는 경우 User를 반환한다', async () => {
    // given
    await service.join(
      'test@naver.com',
      'taehoon',
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );

    // when
    const user = await service.inquery('test@naver.com');

    // then
    expect(user.email).toBe('test@naver.com');
    expect(user.nickname).toBe('taehoon');
    expect(user.profileUrl).toBe(
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );
  });

  it('email을 통해 조회한 결과가 없는 경우 null, undefined를 반환한다', async () => {
    // given
    await service.join(
      'test@naver.com',
      'taehoon',
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );

    // when
    const user = await service.inquery('nothing@naver.com');

    // then
    expect(user).toBe(null);
  });

  it('DB에 email이 동일한 User가 없으면 email, nickname, avatarUrl을 사용해 회원가입을 한다', async () => {
    await service.join(
      'test@naver.com',
      'taehoon',
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );

    const user = await service.inquery('test@naver.com');

    expect(user.email).toBe('test@naver.com');
    expect(user.nickname).toBe('taehoon');
    expect(user.profileUrl).toBe(
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );
  });

  it('DB에 email이 동일한 User가 있으면 회원가입 시 예외를 반환한다', async () => {
    await service.join(
      'test@naver.com',
      'taehoon',
      'https://avatars.githubusercontent.com/u/67636607?v=4',
    );

    expect(
      async () =>
        await service.join(
          'test@naver.com',
          '123',
          'https://avatars.githubusercontent.com/u/67636607?v=4',
        ),
    ).toThrow(Error); // TODO : 에러 구체화하기
  });

  it('User에게 JWT토큰을 발행한다', async () => {
    const { accessToken, refreshToken } = service.login('test@naver.com');

    //accessToken, refreshToken을 까서 값이 올바른가 검사한다
    // TODO 어떤 값이 리턴될지 정확하게 모르겠음
    const { payload } = jwtService.decode(accessToken);
    expect(payload.email).toBe('test@naver.com');
    expect(refreshToken).not.toBeNull();
    expect(refreshToken).not.toBeUndefined();
  });
});
