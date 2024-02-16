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
    let cartProduct = await this.cartProductRepository.findOne({
      where: {
        user_id: userId,
        product_id: body.product_id,
      },
    });

    if (cartProduct) {
      cartProduct.count += 1;
    } else {
      cartProduct = this.cartProductRepository.create({
        user_id: userId,
        product_id: body.product_id,
        count: 1,
      });
    }

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

  async delete(userId: string, productId: string, removeAll: boolean = false) {
    let cartProduct = await this.findOne(userId, productId);

    if (removeAll || cartProduct.count === 1) {
      // If removeAll is true or there's only one item left, remove the entire record
      await this.cartProductRepository.remove(cartProduct);
    } else {
      // If removeAll is false and there's more than one item, decrease the count by one
      cartProduct.count -= 1;
      await this.cartProductRepository.save(cartProduct);
    }

    return cartProduct;
  }
}
