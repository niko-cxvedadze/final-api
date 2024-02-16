import { IsString, IsBase64 } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  name: string;

  @IsBase64()
  image: string;
}

export class CreateManyProductCategoryDto {
  categories: CreateProductCategoryDto[];
}
