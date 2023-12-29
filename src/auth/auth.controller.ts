import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';

import { Public } from 'src/shared/decorators/public.decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateTokensDto } from './dto/update-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async localLogin(@Req() req: any) {
    return this.authService.createTokens(req.user);
  }

  @Get('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }

  @Public()
  @Post('register')
  async localRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.localRegister(registerUserDto);
  }

  @Public()
  @Post('update-tokens')
  updateTokens(@Body() updateTokensDto: UpdateTokensDto) {
    return this.authService.updateTokens(updateTokensDto);
  }
}
