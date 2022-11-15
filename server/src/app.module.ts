import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './domain/user/user.entity';
import { Post } from './domain/post/post.entity';
import { AuthModule } from './domain/auth/auth.module';
import { Review } from './domain/review.entity';
import { PostModule } from './domain/post/post.module';
import { Tag } from './domain/tag.entity';
import { Likes } from './domain/likes.entity';
import { Report } from './domain/report.entity';
import { PostTag } from './domain/post-tag.entity';
import { Image } from './domain/image.entity';

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
        entities: [User, Post, Image, Likes, PostTag, Report, Review, Tag],
        synchronize: true,
      }),
    }),
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
