import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { UserRepository } from '../user/user.repository';
import { TokenNotFoundException } from '../../exception/token-not-found.exception';
import { TokenNotPermittedException } from '../../exception/token-not-permitted.exception';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  authenticate(token) {
    const payload = this.jwtService.decode(token.split(' ')[1]);
    // TODO 날짜를 확인하고 이상없는지 확인
    return payload['id'];
  }

  async authorize({ email, nickname, profileUrl }) {
    let user = await this.userRepository.findOneBy({ email });
    if (user == null) {
      user = await this.userRepository.save({
        email,
        nickname,
        profileUrl,
      });
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profileUrl,
    };
  }

  createTokens(id: number) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_TIME'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TIME'),
      },
    );

    const payload = this.jwtService.decode(accessToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: payload['exp'] * 1000,
    };
  }

  async getUserInfoUsingGithub(code: string) {
    const githubToken = await this.getGithubToken(code);
    const { data: githubInfo } = await lastValueFrom(
      this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }),
    );
    const { data: emails } = await lastValueFrom(
      this.httpService
        .get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${githubToken}`,
          },
        })
        .pipe(
          catchError(() => {
            throw new TokenNotPermittedException();
          }),
        ),
    );
    const { email } = emails.filter((v) => v.primary)[0];
    const { avatar_url: profileUrl, login: nickname } = githubInfo;

    return { email, nickname, profileUrl };
  }

  private async getGithubToken(code: string) {
    const { data } = await lastValueFrom(
      this.httpService.post('https://github.com/login/oauth/access_token', {
        client_id: this.configService.get<string>('AUTH_GITHUB_CLIENT_ID'),
        client_secret: this.configService.get<string>('AUTH_GITHUB_SECRET_KEY'),
        code: code,
      }),
    );
    const githubToken = data.match(/(?<=access_token=).*?(?=&)/);
    if (!githubToken) {
      throw new TokenNotFoundException();
    }
    return githubToken[0];
  }
}
