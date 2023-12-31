import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from './users.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

type CreateUserArgs = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
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
    return user;
  }

  async create({
    email,
    first_name,
    last_name,
    password = null,
  }: CreateUserArgs) {
    const user = this.usersRepository.create({
      first_name,
      last_name,
      email,
      password,
    });
    return await this.usersRepository.save(user);
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

  async update(id: string, data: UpdateUserDto) {}
}
