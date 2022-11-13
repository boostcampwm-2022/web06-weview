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

  async inquery(email: string) {
    return {
      email: null,
      nickname: null,
      profileUrl: null,
    };
  }

  async join(email: string, nickname: string, avatarUrl: string) {}

  login(email: string) {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}
