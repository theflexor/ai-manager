import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mysecret',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
    };
  }
}

