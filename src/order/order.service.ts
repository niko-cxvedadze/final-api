import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOrderDto } from './dtos/create-order.dto';

import { Orders } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
  ) {}

  async create(data: CreateOrderDto) {
    const { title, description, price, owner_id } = data;

    const order = this.orderRepository.create({
      title,
      description,
      price,
      owner_id,
    });

    return await this.orderRepository.save(order);
  }

  async get() {
    return await this.orderRepository.find();
  }

  async delete(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return await this.orderRepository.remove(order);
  }
}
