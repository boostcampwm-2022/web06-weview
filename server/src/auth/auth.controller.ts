import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get('github')
  async authorizeWithGithub(@Query('code') code: string) {
    const { data } = await lastValueFrom(
      this.httpService.post('https://github.com/login/oauth/access_token', {
        client_id: this.configService.get<string>('AUTH_GITHUB_CLIENT_ID'),
        client_secret: this.configService.get<string>('AUTH_GITHUB_SECRET_KEY'),
        code: code,
      }),
    );

    const githubToken = data.match(/(?<=access_token=).*?(?=&)/)[0];
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
    const { avatar_url: avatarUrl, login: nickname } = githubInfo;
  }
}
