import {
  IsBase64,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  salePrice: number;

  @IsBase64()
  image: string;

  @IsNumber()
  price: number;
}

export class UpdateProductDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  salePrice: number;

  @IsBase64()
  image: string;

  @IsNumber()
  @IsOptional()
  price: number;
}

export class CreateManyProductDto {
  products: CreateProductDto[];
}
