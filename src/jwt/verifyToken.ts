import { verify } from 'jsonwebtoken';
import { jwt } from '../config';

export function verifyToken(token: string): Promise<any> {
  if (!token) return Promise.resolve();
  return new Promise((resolve) => {
    verify(token, jwt.secret, (error, decoded) => {
      if (error) return resolve(null);
      resolve(decoded);
    });
  });
}
