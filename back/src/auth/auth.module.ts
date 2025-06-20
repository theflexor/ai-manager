import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './services/cookie.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from './services/password.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret',
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    CookieService,
    PasswordService,
  ],
})
export class AuthModule {}
