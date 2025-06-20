import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { SignInAuth_DTO } from './dto/sign-in-auth.dto';
import { SignUpAuth_DTO } from './dto/sign-up-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User | null = await this.userService.findOneByEmail(email);
    if (!user || !user.passwordHash || !user.salt) {
      throw new BadRequestException('User not found');
    }
    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.passwordHash) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }
  async signIn(body: SignInAuth_DTO) {
    const user = await this.validateUser(body.email, body.password);
    return this.generateTokens(user);
  }

  async signUp(body: SignUpAuth_DTO) {
    const userExists = await this.userService.findOneByEmail(body.email);

    if (userExists) {
      throw new UnauthorizedException('Email is already in use');
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(body.password, salt);

    const user = await this.userService.create({
      ...body,
      passwordHash: hash,
      salt,
    });
    return user;
  }

  async googleLogin(
    profile: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email } = profile;

    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      user = await this.userService.create({
        email,
      });
    }
    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    const payload = { userId: user.id, email: user.email };
    console.log(payload);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10000s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    console.log({ access_token: accessToken, refresh_token: refreshToken });

    return { access_token: accessToken, refresh_token: refreshToken };
  }
}
