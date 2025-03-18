import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SignInAuth_DTO } from './dto/sign-in-auth';
import { SignUpAuth_DTO } from './dto/sign-up-auth';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User | null = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
  async login(body: SignInAuth_DTO) {
    const user = await this.validateUser(body.email, body.password);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: SignUpAuth_DTO) {
    const userExists = await this.userService.findOneByEmail(user.email);

    if (userExists) {
      throw new UnauthorizedException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const users = await this.userService.create({
      ...newUser,
    });
    return this.login(user);
  }
}
