import { IsBase64, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBase64()
  image: string;

  @IsNumber()
  price: number;
}

export class CreateManyProductDto {
  products: CreateProductDto[];
}
