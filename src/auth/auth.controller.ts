import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';

import { Public } from 'src/shared/decorators/public.decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async localLogin(@Req() req) {
    return this.authService.createCredentials(req.user);
  }

  @Public()
  @Post('register')
  async localRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.localRegister(registerUserDto);
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Req() req: any) {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req.user);
  }
}
