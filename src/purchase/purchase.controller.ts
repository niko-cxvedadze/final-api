import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dtos/purchase.dto';
import { Purchase } from './purchase.entity';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return await this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Get()
  async getAllPurchases(): Promise<Purchase[]> {
    return await this.purchaseService.getAllPurchases();
  }

  @Get(':id')
  async getPurchaseById(@Param('id') id: string): Promise<Purchase> {
    return await this.purchaseService.getPurchaseById(id);
  }

  @Delete(':id')
  async deletePurchase(@Param('id') id: string): Promise<Purchase> {
    return await this.purchaseService.deletePurchase(id);
  }
}
