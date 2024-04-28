import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dtos/purchase.dto';
import { Purchase } from './purchase.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Req() req,
  ): Promise<Purchase> {
    return await this.purchaseService.createPurchase(
      createPurchaseDto,
      req.user_id,
    );
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
