import { UserRole_Enum } from 'src/users/users.entity';

export type JwtUserPayload = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: UserRole_Enum;
};
