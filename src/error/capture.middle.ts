import { Middleware } from 'koa';
import { HttpError } from './http.error';

/**
 * a middleware for capture error
 * ```ts
 * import * as koa from 'koa'
 * const app = new koa()
 * app.use(capture())
 * ```
 */
export function capture(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
      if (![200, 201].includes(ctx.status))
        throw new HttpError(ctx.status, '-1', 'find an error', {}, '');
    } catch (e) {
      if (e instanceof HttpError) {
        ctx.status = e.status;
        ctx.body = {
          code: e.code,
          message: e.message,
          details: e.details,
          refer: e.refer,
        };
      } else {
        ctx.status = 500;
        ctx.body = e;
      }
      ctx.app.emit('error', e, ctx);
    }
  };
}
