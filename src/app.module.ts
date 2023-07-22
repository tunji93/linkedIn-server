import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { TypeOrmNamingStrategy } from './typeorm/typeorm-naming-strategy';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.env.TYPEORM_HOST,
        port: +configService.env.TYPEORM_PORT,
        username: configService.env.TYPEORM_USERNAME,
        password: configService.env.TYPEORM_PASSWORD,
        database: configService.env.TYPEORM_DATABASE,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
        namingStrategy: new TypeOrmNamingStrategy(),
        logging: configService.env.TYPEORM_LOGGING,
        ssl: configService.env.NODE_ENV === 'test',
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    FeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
