import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '@nestjs/config';

// TODO 의문 : 서비스 계층 테스트를 할 때 Repository를 Mocking 해야하나?
//  Mocking에 대해 학습해보기

const mockConfigService = {
  get: jest.fn((key: string) => {
    if (new RegExp('TIME').test(key)) {
      return '30d';
    }

    return key;
  }),
};

const mockRepository = {
  findOneBy: jest.fn(({ email }) => {
    const user = new User();
    user.id = 1;
    user.email = email;

    return user;
  }),
  save: jest.fn((obj) => {
    const user = new User();
    user.id = 1;
    user.email = obj.email;
    user.nickname = obj.nickname;
    user.profileUrl = obj.profileUrl;

    return user;
  }),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
        JwtService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('인증', () => {
    const mockUserInfo = {
      email: 'alreadyRegister@naver.com',
      nickname: 'nickname',
      profileUrl: 'https://avatars.githubusercontent.com/u/67636607?v=4',
    };

    it('이전에 가입한 회원이면 로그인한다.', async () => {
      const user = await service.authorize(mockUserInfo);

      // then
      expect(user.id).toBe(1);
      expect(user.email).toBe(mockUserInfo.email);
      expect(mockRepository.findOneBy).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(0);
    });

    it('이전에 가입하지 않은 회원이면 정상적으로 회원가입이 된다', async () => {
      // findOneBy()가 한 번만 null을 반환하도록 한다.
      mockRepository.findOneBy.mockReturnValueOnce(null);

      const user = await service.authorize(mockUserInfo);

      expect(user.id).toBe(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('User에게 JWT토큰을 발행한다', async () => {
      const { accessToken, refreshToken } = service.createTokens(12311);
      const accessPayload = jwtService.decode(accessToken);
      const refreshPayload = jwtService.decode(refreshToken);

      expect(accessPayload['id']).toBe(12311);
      expect(refreshPayload['id']).toBe(12311);
      expect(typeof accessPayload['exp']).toBe('number');
      expect(typeof refreshPayload['exp']).toBe('number');
      expect(accessPayload['iat']).not.toBeUndefined();
      expect(refreshPayload['iat']).not.toBeUndefined();
    });
  });
});
