import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dtos/purchase.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private cartService: CartService,
  ) {}

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
    userId: string,
  ): Promise<Purchase> {
    console.log('🚀 ~ PurchaseService ~ userId:', userId);
    const { totalPrice, totalItems } = createPurchaseDto;

    const purchase = this.purchaseRepository.create({
      totalPrice,
      totalItems,
      user_id: userId,
    });

    const purchases = await this.purchaseRepository.save(purchase);

    // Clear the cart after the purchase
    await this.cartService.clear(userId);

    return purchases;
  }

  async getAllPurchases(userId: string): Promise<Purchase[]> {
    return await this.purchaseRepository.find({ where: { user_id: userId } });
  }

  async getPurchaseById(id: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({ where: { id } });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return purchase;
  }

  async deletePurchase(id: string): Promise<Purchase> {
    const purchase = await this.getPurchaseById(id);
    return await this.purchaseRepository.remove(purchase);
  }
}
