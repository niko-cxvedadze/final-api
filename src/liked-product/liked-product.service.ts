import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LikedProduct } from './liked-product.entity';
import { CreateLikedProductDto } from './dtos/create-liked-product.dto';

@Injectable()
export class LikedProductService {
  constructor(
    @InjectRepository(LikedProduct)
    private likedProductRepository: Repository<LikedProduct>,
  ) {}
  async create(userId: string, body: CreateLikedProductDto) {
    const likedProduct = this.likedProductRepository.create({
      user_id: userId,
      product_id: body.product_id,
    });
    return await this.likedProductRepository.save(likedProduct);
  }

  async findAll(userId: string) {
    const likedProducts = await this.likedProductRepository.find({
      where: { user_id: userId },
    });
    return likedProducts;
  }

  async findOne(userId: string, productId: string) {
    const likedProduct = await this.likedProductRepository.findOne({
      where: { user_id: userId, id: productId },
    });

    if (!likedProduct) {
      throw new NotFoundException('liked product not found');
    }

    return likedProduct;
  }

  async delete(userId: string, productId: string) {
    const likedProduct = await this.findOne(userId, productId);
    return await this.likedProductRepository.remove(likedProduct);
  }
}
