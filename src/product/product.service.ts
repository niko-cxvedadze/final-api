import { In, Repository } from 'typeorm';
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
      query.andWhere('LOWER(product.title) LIKE :productName', {
        productName: `%${productName.toLowerCase()}%`,
      });
    }

    if (minPrice) {
      query.andWhere(
        'CASE WHEN product.salePrice IS NOT NULL THEN product.salePrice ELSE product.price END >= :minPrice',
        { minPrice },
      );
    }

    if (maxPrice) {
      query.andWhere(
        'CASE WHEN product.salePrice IS NOT NULL THEN product.salePrice ELSE product.price END <= :maxPrice',
        { maxPrice },
      );
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
  async delete(ids: string[]) {
    // Check if any IDs were provided
    if (!ids || ids.length === 0) {
      throw new NotFoundException(
        'Please provide an array of product IDs to delete.',
      );
    }

    // Find products by IDs
    const productsToDelete = await this.productRepository.find({
      where: { id: In(ids) },
    });

    // Check if all products were found
    if (productsToDelete.length !== ids.length) {
      throw new NotFoundException(
        'Some products with provided IDs were not found.',
      );
    }

    // Delete products
    await this.productRepository.remove(productsToDelete);

    // Return success message (optional)
    return { message: 'Products deleted successfully.' };
  }

  async deleteAll() {
    const products = await this.productRepository.find();
    return await this.productRepository.remove(products);
  }
}
