import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { OfferModule } from './offer/offer.module';

import { Users } from './users/users.entity';
import { Orders } from './order/order.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'root',
      password: 'root',
      database: 'inwork',
      entities: [Users, Orders],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    OrderModule,
    OfferModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
