import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateManyProductDto,
} from './dtos/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  async findAll() {
    return this.productService.findAll();
  }

  @Get('id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete('delete-all')
  @UseGuards(JwtAuthGuard)
  deleteAll() {
    return this.productService.deleteAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
