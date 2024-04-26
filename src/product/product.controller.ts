import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';

import {
  CreateProductDto,
  CreateManyProductDto,
  UpdateProductDto,
} from './dtos/create-product.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Pagination } from 'src/shared/decorators/pagination.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Post('many')
  @UseGuards(JwtAuthGuard)
  createMany(@Body() body: CreateManyProductDto) {
    return this.productService.createMany(body);
  }

  @Get()
  async findAll(
    @Query('categoryName') categoryName: string,
    @Query('productName') productName: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('onlySales') onlySales: boolean,
    @Pagination() pagination: { page: number; pageSize: number },
  ) {
    const { page, pageSize } = pagination;

    return this.productService.findAll(
      page,
      pageSize,
      categoryName,
      productName,
      minPrice,
      maxPrice,
      onlySales,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete('delete-all')
  @UseGuards(JwtAuthGuard)
  deleteAll() {
    return this.productService.deleteAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body('ids') ids: string[]) {
    return this.productService.delete(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() body: UpdateProductDto) {
    return this.productService.update(body);
  }
}
