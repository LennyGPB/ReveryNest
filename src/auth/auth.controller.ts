import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return this.authService.getMe(req.user.id);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email)
  }

  @Post("push-token")
  async savePushToken(@Request() req, @Body() body: { token: string }) {
    return this.authService.savePushToken(req.user.id, body.token);
  }

}