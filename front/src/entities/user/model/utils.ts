import { useMemo } from 'react';
import Cookies from 'js-cookie';

interface JWTPayload {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  iat: number;
  exp: number;
}

export const useAuthPayload = (): JWTPayload => {
  const token = Cookies.get('access-token');
  console.log(token);

  const payload = useMemo(() => {
    if (!token) return null;

    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = atob(base64Payload);
      return JSON.parse(decodedPayload) as JWTPayload;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }, [token]);

  return payload!;
};

