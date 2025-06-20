// types/requestWithUser.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  session: UserSession;
}

export interface UserSession {
  userId: number;
  email: string;
}

