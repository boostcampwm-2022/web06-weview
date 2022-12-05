import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { PostModule } from './domain/post/post.module';
import { ReviewModule } from './domain/review/review.module';
import { LikesModule } from './domain/likes/likes.module';
import { ReportModule } from './domain/report/report.module';
import { UserModule } from './domain/user/user.module';

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
        entities: [__dirname + '/domain/**/*.entity.{js,ts}'],
        synchronize: configService.get('NODE_ENV') !== 'prod',
        logging: configService.get('NODE_ENV') !== 'prod',
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'mongo',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGO_HOST'),
        port: configService.get('MONGO_PORT'),
        database: configService.get('MONGO_NAME'),
        entities: [__dirname + '/domain/**/*.mongo.{js,ts}'],
        synchronize: configService.get('NODE_ENV') !== 'prod',
        logging: configService.get('NODE_ENV') !== 'prod',
        useUnifiedTopology: true,
      }),
    }),
    AuthModule,
    PostModule,
    ReviewModule,
    LikesModule,
    ReportModule,
    UserModule,
  ],
})
export class AppModule {}
