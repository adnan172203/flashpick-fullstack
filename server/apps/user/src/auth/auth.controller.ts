import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignupDto): Promise<string> {
    return this.authService.signUp(body);
  }
  @Post('signin')
  signIn(@Body() body: SigninDto): Promise<string> {
    return this.authService.signIn(body);
  }
}
