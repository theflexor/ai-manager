import {
  GoogleCallbackParameters,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        '707775483594-24a0vaaqktgphp7susor7m3j2jqt5r4k.apps.googleusercontent.com', // Ваш Google Client ID
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        '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', // Ваш Google Client Secret
      callbackURL: 'http://localhost:3001/auth/google/redirect', // URL для редиректа
      scope: ['email', 'profile'], // Области, которые вы запрашиваете
      passReqToCallback: true,
    });
  }
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
    params: GoogleCallbackParameters,
  ): Promise<any> {
    console.log(req, accessToken, refreshToken, profile, done, params);
    const user = {
      email: profile.emails![0].value,
      name: profile.name?.givenName,
      lastName: profile.name!.familyName,
    };
    done(null, user);
  }
}

