import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from './users.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

type CreateUserArgs = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone_number: string;
};

type UpdateRefreshTokenArgs = {
  id: string;
  refresh_token?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(criteria: Partial<Users>): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: criteria });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(userId: string, body: UpdateUserDto) {
    const user = await this.findOne({ id: userId });

    const updatedUser = {
      ...user,
      ...body,
    };

    await this.usersRepository.update(userId, updatedUser);

    return updatedUser;
  }

  async create({
    email,
    first_name,
    last_name,
    password = null,
    phone_number,
  }: CreateUserArgs) {
    const user = this.usersRepository.create({
      first_name,
      last_name,
      email,
      password,
      phone_number,
    });
    try {
      const createdUser = await this.usersRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateRefreshToken(data: UpdateRefreshTokenArgs) {
    const { id, refresh_token = null } = data;

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.refresh_token = refresh_token;
    await this.usersRepository.save(user);

    return user;
  }
}
