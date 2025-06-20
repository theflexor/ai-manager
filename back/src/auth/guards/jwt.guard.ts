import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { CookieService } from '../services/cookie.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken'; // Импортируем для проверки на истечение токена

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const sessionInfo = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      req['session'] = sessionInfo;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired'); // Обрабатываем истечение токена
      }
      throw new UnauthorizedException('Invalid token'); // Обрабатываем другие ошибки JWT
    }

    return true;
  }
}

