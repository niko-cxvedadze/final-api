import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(body: CreateProductDto) {
    const product = this.productRepository.create({
      ...body,
      image: 'data:image/png;base64,' + body.image,
    });
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }
}
