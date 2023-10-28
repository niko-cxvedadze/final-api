import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async localLogin(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async localRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.localRegister(registerUserDto);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Req() req: any) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req.user);
  }
}
