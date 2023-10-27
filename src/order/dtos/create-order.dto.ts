import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  owner_id: string;

  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsNumber()
  price: number;
}
