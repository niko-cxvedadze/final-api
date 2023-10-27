import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
