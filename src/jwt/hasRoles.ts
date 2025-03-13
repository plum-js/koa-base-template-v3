import { Context, Next } from 'koa';
import { JwtError } from './jwt.error';

export function hasRoles(...roles: string[]) {
  return async (ctx: Context, next: Next) => {
    for (const role of roles) {
      if (!ctx.auth.roles.includes(role))
        throw new JwtError('03', 'no such role');
    }
    await next();
  };
}

export function hasRolesOr(...roles: string[]) {
  return async (ctx: Context, next: Next) => {
    let flag = false;
    for (const role of roles) {
      if (ctx.auth.roles.includes(role)) flag = true;
    }
    if (!flag) throw new JwtError('04', 'no such roles');
    await next();
  };
}
