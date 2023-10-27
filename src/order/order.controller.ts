import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';

import { OrderService } from './order.service';

import { CreateOrderDto } from './dtos/create-order.dto';
import { FindOneParams } from '../shared/params/find-one.params';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  get() {
    return this.orderService.get();
  }

  @Delete(':id')
  delete(@Param() params: FindOneParams) {
    return this.orderService.delete(params.id);
  }
}
