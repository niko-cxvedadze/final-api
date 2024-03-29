import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import {
  CreateProductDto,
  CreateManyProductDto,
  UpdateProductDto,
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

  async update(body: UpdateProductDto) {
    const product = await this.findOne(body.id);

    const { image, ...productData } = body;
    const updatedProduct = { ...product, ...productData };

    if (image) {
      updatedProduct.image = 'data:image/png;base64,' + image;
    }

    await this.productRepository.update(product.id, updatedProduct);
    return updatedProduct;
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

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    categoryName?: string,
    productName?: string,
    minPrice?: number,
    maxPrice?: number,
    onlySales?: boolean,
  ): Promise<{ products: Product[]; total: number }> {
    const query = this.productRepository.createQueryBuilder('product');

    if (categoryName) {
      query.where('product.category_name = :categoryName', { categoryName });
    }

    if (productName) {
      query.andWhere('product.title LIKE :productName', {
        productName: `%${productName}%`,
      });
    }

    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (onlySales) {
      query.andWhere('product.salePrice IS NOT NULL');
    }

    const [products, total] = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { products, total };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }
  async delete(id: string) {
    const product = await this.findOne(id);

    return await this.productRepository.remove(product);
  }

  async deleteAll() {
    const products = await this.productRepository.find();
    return await this.productRepository.remove(products);
  }
}
