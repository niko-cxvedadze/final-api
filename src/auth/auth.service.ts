import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import { JwtUserPayload } from './auth.types';

import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateTokensDto } from './dto/update-tokens.dto';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async comparePassword(inputPassword: string, userPassword: string) {
    return await compare(inputPassword, userPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    const passwordEqual = await this.comparePassword(password, user.password);

    if (passwordEqual) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createTokens(user: Users) {
    const payload = {
      email: user.email,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role,
    };

    const tokens = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '4w',
        secret: jwtConstants.refreshTokenSecret,
      }),
    };

    await this.usersService.updateRefreshToken({
      id: user.id,
      refresh_token: tokens.refresh_token,
    });

    return tokens;
  }

  async updateTokens(data: UpdateTokensDto) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    let decodedToken: JwtPayload & JwtUserPayload;

    try {
      decodedToken = this.jwtService.verify(data.refresh_token, {
        secret: jwtConstants.refreshTokenSecret,
      });
    } catch {
      throw new HttpException(
        { message: 'invalid refresh_token' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (decodedToken.exp < currentTimestamp) {
      throw new HttpException(
        { message: 'refresh_token is expired' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.findOne({ id: decodedToken.id });

    if (user.refresh_token === data.refresh_token) {
      return this.createTokens(user);
    } else {
      throw new HttpException(
        { message: 'invalid refresh_token' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout(id: string) {
    return await this.usersService.updateRefreshToken({
      id,
      refresh_token: null,
    });
  }

  async localRegister(data: RegisterUserDto) {
    const { email, password, first_name, last_name, phone_number } = data;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
    });

    if (!user) {
      throw new HttpException('create user error', HttpStatus.BAD_REQUEST);
    }

    return this.createTokens(user);
  }
}
