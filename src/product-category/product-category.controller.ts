import {
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateProductCategoryDto } from './dtos/create-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateProductCategoryDto) {
    return this.productCategoryService.create(body);
  }

  @Get()
  async findAll() {
    return this.productCategoryService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.productCategoryService.delete(id);
  }
}
