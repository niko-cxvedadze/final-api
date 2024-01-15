import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }
}
