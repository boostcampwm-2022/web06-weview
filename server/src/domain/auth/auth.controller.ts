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
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  AuthorizeWithGithubDto,
  RefreshTokensDto,
} from './dto/controller-response.dto';
import { RefreshTokenGuard } from './refresh-token.guard';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenNotFoundException } from '../../exception/token-not-found.exception';
import { TokenNotPermittedException } from '../../exception/token-not-permitted.exception';
import { AccessTokenGuard } from './access-token.guard';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @ApiOperation({
    summary: '인증',
    description: '깃허브 코드를 사용해 사용자를 인증합니다',
  })
  @ApiOkResponse({ description: 'accessToken과 로그인 정보를 받아옵니다' })
  @ApiBadRequestResponse({ description: 'Github 관련 인증에 문제가 있습니다' })
  async authorizeWithGithub(
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
  ): Promise<AuthorizeWithGithubDto> {
    try {
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
    } catch (err) {
      if (err instanceof TokenNotFoundException) {
        throw new BadRequestException(err.message);
      }
      if (err instanceof TokenNotPermittedException) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: '토큰 갱신',
    description: 'refresh 토큰을 사용해 accessToken을 갱신합니다',
  })
  @ApiUnauthorizedResponse({ description: 'Refresh 토큰이 잘못되었습니다' })
  @ApiOkResponse({ description: '올바른 요청입니다' })
  @ApiCookieAuth('refreshToken')
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
  @ApiOperation({
    summary: '로그아웃',
    description: 'refreshToken을 지웁니다',
  })
  @ApiNoContentResponse({ description: '로그아웃에 성공했습니다' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return;
  }

  @Get('/s3-url')
  @UseGuards(AccessTokenGuard)
  getPresignedUrl(@Query('imageCount') imageCount: number) {
    const endpoint = 'https://kr.object.ncloudstorage.com';
    const region = 'kr-standard';
    const access_key = this.configService.get('NCP_ACCESS_KEY');
    const secret_key = this.configService.get('NCP_SECRET_KEY');

    const s3 = new S3({
      endpoint,
      region,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
      },
      signatureVersion: 'v4',
    });

    const arr = [];
    for (let i = 1; i <= imageCount; i++) {
      const presigned = s3.createPresignedPost({
        Bucket: 'weview-image-dev',
        Fields: {
          Key: randomUUID() + Date.now() + '.jpeg',
          ACL: 'public-read',
        },
        Expires: 60,
      });

      arr.push(presigned);
    }

    return arr;
  }
}
