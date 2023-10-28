import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { UserRole_Enum } from '../users.entity';

export class UpdateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  phone_number: string;
  @IsBoolean()
  verified: boolean;
  @IsEnum(UserRole_Enum)
  role: string;
  @IsString()
  refresh_token: string;
}
