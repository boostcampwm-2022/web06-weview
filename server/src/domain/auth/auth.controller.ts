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
import {
  AuthorizeWithGithubDto,
  RefreshTokensDto,
} from './dto/controller-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/github')
  async authorizeWithGithub(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ): Promise<AuthorizeWithGithubDto> {
    const userInfo = await this.authService.getUserInfoUsingGithub(code);

    const { email, nickname, profileUrl } = userInfo;

    let user = await this.authService.findByEmail(email);
    if (user == null) {
      user = await this.authService.join(email, nickname, profileUrl);
    }

    const { accessToken, refreshToken, expiresIn } =
      this.authService.createTokens(user.id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return {
      accessToken: accessToken,
      expiresIn: expiresIn,
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      profileUrl: user.profileUrl,
    };
  }

  @Get('auth/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): RefreshTokensDto {
    const email = req.user['email'];

    const { accessToken, refreshToken, expiresIn } =
      this.authService.createTokens(email);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return {
      accessToken: accessToken,
      expiresIn: expiresIn,
    };
  }

  @Delete('auth/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return;
  }
}
