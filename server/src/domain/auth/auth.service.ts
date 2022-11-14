import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async join(email: string, nickname: string, avatarUrl: string) {
    const user = await this.findByEmail(email);
    if (user != null) {
      throw new Error('이미 존재하는 계정입니다');
    }
    return await this.userRepository.save({
      email: email,
      nickname: nickname,
      profileUrl: avatarUrl,
    });
  }

  // TODO 직관적으로 이름 변경하기
  getTokens(id: number) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: 'ACCESS TOKEN TEMP KEY',
        expiresIn: '30m',
      },
    );
    const refreshToken = this.jwtService.sign(
      { id },
      {
        secret: 'REFRESH TOKEN TEMP KEY',
        expiresIn: '14d',
      },
    );
    const payload = this.jwtService.decode(accessToken);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: payload['exp'],
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
}
