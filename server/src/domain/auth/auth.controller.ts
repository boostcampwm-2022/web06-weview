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
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/github')
  async authorizeWithGithub(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ) {
    const userInfo = await this.authService.getUserInfoUsingGithub(code);

    const { email, nickname, avatarUrl } = userInfo;

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
