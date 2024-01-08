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
      host: 'mel.db.elephantsql.com',
      port: 5432,
      username: 'nggcsoka',
      password: 'EZApzNgZT_ADT8eCLDguOTHrIqmJlW2T',
      database: 'nggcsoka',
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
