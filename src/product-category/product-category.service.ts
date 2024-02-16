import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductCategory } from './product-category.entity';
import {
  CreateProductCategoryDto,
  CreateManyProductCategoryDto,
} from './dtos/create-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(body: CreateProductCategoryDto) {
    const productCategory = this.productCategoryRepository.create({
      ...body,
      image: 'data:image/png;base64,' + body.image,
    });
    return await this.productCategoryRepository.save(productCategory);
  }

  async createMany(body: CreateManyProductCategoryDto) {
    const productCategories = body.categories.map((category) =>
      this.productCategoryRepository.create({
        ...category,
        image: 'data:image/png;base64,' + category.image,
      }),
    );
    return await this.productCategoryRepository.save(productCategories);
  }

  async findAll() {
    return await this.productCategoryRepository.find();
  }

  async findOne(id: string) {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id },
    });
    if (!productCategory) {
      throw new Error('Product category not found');
    }
    return productCategory;
  }

  async delete(id: string) {
    const productCategory = await this.findOne(id);
    return await this.productCategoryRepository.remove(productCategory);
  }

  async deleteAll() {
    const productCategories = await this.findAll();
    return await this.productCategoryRepository.remove(productCategories);
  }
}
