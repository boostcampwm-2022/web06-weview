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
  async authorizeWithGithub(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ) {
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
    let user = await this.authService.findByEmail(email);
    if (user == null) {
      user = await this.authService.join(email, nickname, avatarUrl);
    }
    const { accessToken, refreshToken, expiresIn } = this.authService.getTokens(
      user.id,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return {
      accessToken: accessToken,
      expiresIn: expiresIn * 1000,
      id: user.id,
      username: user.nickname,
      email: user.email,
      avatarUrl: user.profileUrl,
    };
  }

  @Get('auth/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const email = req.user['email'];
    const { accessToken, refreshToken, expiresIn } =
      this.authService.getTokens(email);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return {
      accessToken,
      expiresIn: expiresIn * 1000,
    };
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return;
  }
}
