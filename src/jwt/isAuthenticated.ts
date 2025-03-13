import { Context, Next } from 'koa';
import { getHeaderToken } from './getHeaderToken';
import { verifyToken } from './verifyToken';
import { JwtError } from './jwt.error';

export function isAuthenticated() {
  return async (ctx: Context, next: Next) => {
    const token = getHeaderToken(ctx);
    const decoded = await verifyToken(token);
    if (!decoded) throw new JwtError('01', 'auth error');
    ctx.auth = decoded;
    await next();
  };
}
