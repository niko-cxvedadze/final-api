import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dtos/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const { totalPrice, totalItems } = createPurchaseDto;

    const purchase = this.purchaseRepository.create({
      totalPrice,
      totalItems,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async getAllPurchases(): Promise<Purchase[]> {
    return await this.purchaseRepository.find();
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
