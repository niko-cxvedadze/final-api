import { IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  name: string;
}

export class CreateManyProductCategoryDto {
  categories: CreateProductCategoryDto[];
}
