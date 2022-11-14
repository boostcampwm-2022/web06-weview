import { HttpService } from '@nestjs/axios';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Get,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get('auth/github')
  async authorizeWithGithub(@Query('code') code: string) {
    // TODO Service 계층으로 분리하기
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

  @Get('auth/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(@Req() req: Request, @Res() res: Response) {
    const email = req.user['email'];

    return this.authService.getTokens(email);
  }

  @Delete('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('refreshToken');
    return;
  }
}
