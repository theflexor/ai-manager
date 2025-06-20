import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { SignUpAuth_DTO } from './dto/sign-up-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { SignInAuth_DTO } from './dto/sign-in-auth.dto';
import { GetSessionInfoDto } from './dto/get-session-info.dto';
import { SessionInfo } from './decorators/session-info.decorator';
import { CookieService } from './services/cookie.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('signUp')
  @ApiCreatedResponse()
  async SignUp(@Body() body: SignUpAuth_DTO): Promise<User> {
    return await this.authService.signUp(body);
  }

  @Post('signIn')
  @ApiOkResponse({
    description: 'Sign in successful',
  })
  async SignIn(@Body() body: SignInAuth_DTO, @Res() res) {
    const payload = await this.authService.signIn(body);
    this.cookieService.setToken(res, payload.access_token);
    return res.status(200).json({
      message: 'Sign in successful',
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<undefined> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req, @Res() res) {
    const payload = this.authService.googleLogin(req.user);

    this.cookieService.setToken(res, (await payload).access_token);

    return res.redirect('http://localhost:3000');
  }

  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(JwtGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
