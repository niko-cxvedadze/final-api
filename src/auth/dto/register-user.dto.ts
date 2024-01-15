import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  @Length(9, 9)
  phone_number: string;
  @IsString()
  @Length(8, 24)
  password: string;
  @IsEmail()
  email: string;
}
