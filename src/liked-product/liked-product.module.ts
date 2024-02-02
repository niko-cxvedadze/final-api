import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedProductController } from './liked-product.controller';
import { LikedProductService } from './liked-product.service';

import { LikedProduct } from './liked-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikedProduct])],
  controllers: [LikedProductController],
  providers: [LikedProductService],
})
export class LikedProductModule {}
