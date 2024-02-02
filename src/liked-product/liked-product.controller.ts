import {
  Controller,
  UseGuards,
  Get,
  Req,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateLikedProductDto } from './dtos/create-liked-product.dto';

import { LikedProductService } from './liked-product.service';

@Controller('liked-products')
export class LikedProductController {
  constructor(private readonly likedProductsService: LikedProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.likedProductsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateLikedProductDto, @Req() req) {
    return this.likedProductsService.create(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') productId: string, @Req() req) {
    return this.likedProductsService.delete(req.user.id, productId);
  }
}
