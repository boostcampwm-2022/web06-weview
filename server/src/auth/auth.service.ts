import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

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

  async join(email: string, nickname: string, avatarUrl: string) {
    const user = await this.findByEmail(email);
    if (user != null) {
      throw new Error('이미 존재하는 계정입니다');
    }

    const userId = await this.userRepository.save({
      email: email,
      nickname: nickname,
      profileUrl: avatarUrl,
    });
    return userId;
  }

  login(email: string) {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}
