import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
