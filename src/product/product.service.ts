import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import {
  CreateProductDto,
  CreateManyProductDto,
} from './dtos/create-product.dto';

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

  async createMany(body: CreateManyProductDto) {
    const products = body.products.map((product) =>
      this.productRepository.create({
        ...product,
        image: 'data:image/png;base64,' + product.image,
      }),
    );

    return await this.productRepository.save(products);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
  async delete(id: string) {
    const product = await this.findOne(id);

    return await this.productRepository.remove(product);
  }

  async deleteAll() {
    const products = await this.findAll();
    return await this.productRepository.remove(products);
  }
}
