import { IsNumber, IsInt, IsDecimal } from 'class-validator';

export class CreatePurchaseDto {
  @IsNumber()
  totalPrice: number;

  @IsInt()
  totalItems: number;
}
