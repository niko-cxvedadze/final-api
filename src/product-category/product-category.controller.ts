import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async create(@Body() body: CreateProductCategoryDto) {
    return this.productCategoryService.create(body);
  }

  @Get()
  async findAll() {
    return this.productCategoryService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productCategoryService.delete(id);
  }
}
