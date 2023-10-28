import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

type CreateUserArgs = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  sub_id?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async createUser({
    email,
    first_name,
    last_name,
    password = null,
    sub_id = null,
  }: CreateUserArgs) {
    const user = this.usersRepository.create({
      first_name,
      last_name,
      email,
      password,
      sub_id,
    });
    return await this.usersRepository.save(user);
  }
}
