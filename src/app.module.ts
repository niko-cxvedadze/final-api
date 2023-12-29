import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mel.db.elephantsql.com',
      port: 5432,
      username: 'nggcsoka',
      password: '2YB6q0-ZUnHGl8U1Z7p4yOexaxKEP8Ga',
      database: 'nggcsoka',
      entities: [Users],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
