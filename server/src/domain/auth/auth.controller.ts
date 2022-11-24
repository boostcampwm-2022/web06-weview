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
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  AuthorizeWithGithubDto,
  RefreshTokensDto,
} from './dto/controller-response.dto';
import { RefreshTokenGuard } from './refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  async authorizeWithGithub(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ): Promise<AuthorizeWithGithubDto> {
    const userInfo = await this.authService.getUserInfoUsingGithub(code);

    const user = await this.authService.authorize(userInfo);

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

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): RefreshTokensDto {
    const id = req.user['id'];

    const { accessToken, refreshToken, expiresIn } =
      this.authService.createTokens(id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return {
      accessToken: accessToken,
      expiresIn: expiresIn,
    };
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return;
  }
}
