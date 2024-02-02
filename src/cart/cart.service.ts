import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CartProduct } from './cart.entity';
import { CreateCartProduct } from './dtos/create-cart-product.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  async create(userId: string, body: CreateCartProduct) {
    const cartProduct = this.cartProductRepository.create({
      user_id: userId,
      product_id: body.product_id,
    });
    return await this.cartProductRepository.save(cartProduct);
  }

  async findOne(userId: string, productId: string) {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { user_id: userId, id: productId },
    });

    if (!cartProduct) {
      throw new NotFoundException('cart product not found');
    }

    return cartProduct;
  }

  async findAll(userId: string) {
    const cartProducts = await this.cartProductRepository.find({
      where: { user_id: userId },
    });
    return cartProducts;
  }

  async delete(userId: string, productId: string) {
    const cartProduct = await this.findOne(userId, productId);
    return await this.cartProductRepository.remove(cartProduct);
  }
}
