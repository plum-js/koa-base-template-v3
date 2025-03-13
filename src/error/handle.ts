import { Context } from 'koa';

/**
 * some operation for erros
 * ```ts
 * import * as koa from 'koa'
 * const app = new koa()
 * app.on('error', (e, ctx)=>handle(e, ctx))
 * ```
 * @param e instanceof Error
 * @param ctx koa.Context
 */
export function handle(e: Error, ctx: Context) {
  // do something, db or logger operation
  console.log(ctx.status, e.message);
}
