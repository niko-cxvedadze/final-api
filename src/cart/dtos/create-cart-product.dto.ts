import { IsString } from 'class-validator';

export class CreateCartProduct {
  @IsString()
  product_id: string;
}
