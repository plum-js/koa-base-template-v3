import { Context } from 'koa';

export function getHeaderToken(ctx: Context): string | null {
  if (
    !ctx.headers.authorization ||
    !ctx.headers.authorization.startsWith('Bearer ')
  )
    return null;
  return ctx.headers.authorization.substring(7);
}
