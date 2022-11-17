import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './domain/user/user.entity';
import { Post } from './domain/post/post.entity';
import { AuthModule } from './domain/auth/auth.module';
import { PostModule } from './domain/post/post.module';
import { PostToTag } from './domain/tag/post-to-tag.entity';
import { Tag } from './domain/tag/tag.entity';
import { Image } from './domain/image/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Post, Image, Tag, PostToTag],
        synchronize: true,
        logging: true,
      }),
    }),
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
