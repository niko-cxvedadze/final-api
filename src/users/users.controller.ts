import { Controller, Get, Put, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  currentUser(@Req() req) {
    return this.usersService.findOne({ id: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() body: UpdateUserDto, @Req() req) {
    return this.usersService.update(req.user.id, body);
  }
}
