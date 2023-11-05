import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.model';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signOn(@Body() user: RegisterDTO): Promise<User> {
    return await this.authService.register(user as User);
  }

  @Post('login')
  async signIn(@Body() userCredentials: LoginDTO): Promise<User> {
    return this.authService.login(userCredentials);
  }
}
