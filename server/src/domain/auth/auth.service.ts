import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async join(email: string, nickname: string, profileUrl: string) {
    const user = await this.findByEmail(email);
    if (user != null) {
      throw new Error('이미 존재하는 계정입니다');
    }
    return await this.userRepository.save({
      email: email,
      nickname: nickname,
      profileUrl: profileUrl,
    });
  }

  createTokens(id: number) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '30m',
      },
    );

    const refreshToken = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '14d',
      },
    );

    const payload = this.jwtService.decode(accessToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: payload['exp'] * 1000,
    };
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    if (user == null) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      profileUrl: user.profileUrl,
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
      this.httpService.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }),
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

    const githubToken = data.match(/(?<=access_token=).*?(?=&)/)[0];
    return githubToken;
  }
}
