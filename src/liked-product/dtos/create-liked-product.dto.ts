import { IsString } from 'class-validator';

export class CreateLikedProductDto {
  @IsString()
  product_id: string;
}
