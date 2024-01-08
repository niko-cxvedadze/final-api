import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'tyke.db.elephantsql.com',
      password: 'n2YVzOIdaMRRtU-RO77HZvOA0_YZfgvC',
      username: 'hildzswu',
      database: 'hildzswu',
      entities: [Users],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
