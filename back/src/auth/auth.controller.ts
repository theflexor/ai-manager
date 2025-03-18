import { Body, Controller, Post } from '@nestjs/common';

import { SignUpAuth_DTO } from './dto/sign-up-auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  SignUp(@Body() body: SignUpAuth_DTO) {
    return this.authService.signUp(body);
  }

  @Post('signIn')
  SignIn(@Body() body: any) {
    return this.authService.login(body);
  }
}
