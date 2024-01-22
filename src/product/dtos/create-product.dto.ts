import { IsBase64, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBase64()
  image: string;
}

export class CreateManyProductDto {
  products: CreateProductDto[];
}
