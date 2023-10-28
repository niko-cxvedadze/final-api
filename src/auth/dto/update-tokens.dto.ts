import { IsString } from 'class-validator';

export class UpdateTokensDto {
  @IsString()
  refresh_token: string;
}
