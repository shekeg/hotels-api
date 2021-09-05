import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UnauthenticatedGuard } from 'src/common/guards/unauthenticated.guard';
import { User } from 'src/users/users.schema';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UnauthenticatedGuard)
  @Post('api/client/register')
  async register(@Body() data: RegisterUserDto) {
    const userDocument = await this.authService.register(data);
    return {
      _id: userDocument._id,
      email: userDocument.email,
      name: userDocument.name,
    };
  }

  @UseGuards(UnauthenticatedGuard, LocalAuthGuard)
  @Post('api/auth/login')
  login(@Request() req) {
    const userDocument: User = req.user._doc;
    return {
      email: userDocument.email,
      name: userDocument.name,
      contactPhone: userDocument.contactPhone,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('api/auth/logout')
  logout(@Request() req) {
    req.logout();
  }
}
