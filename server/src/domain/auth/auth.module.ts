import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AccessTokenStrategy } from './access-token.strategy';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { UserRepository } from '../user/user.repository';
import { NcpObjectStorage } from './ncp-object-storage';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  providers: [
    AuthService,
    UserRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    NcpObjectStorage,
  ],
  controllers: [AuthController],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
