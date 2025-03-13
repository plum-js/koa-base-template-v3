import { Context } from 'koa';
import { StudentModel } from '../models';
import { validate } from '../validators';
import { StudentError } from '../errors';

/**
 * find One by _id
 * @param ctx
 * @param next
 */
export async function findOne(ctx: Context, next: any) {
  // fetch params
  const { id } = ctx.params;
  // validate
  validate({ _id: id });
  // do business
  const data = await StudentModel.findOne({ _id: id }).catch((e) => {
    throw new StudentError('03', e.message);
  });
  // res web
  ctx.response.status = 200;
  ctx.response.body = {
    code: 0,
    data,
  };
  await next();
}

/**
 * find many
 * @param ctx
 * @param next
 */
export async function findMany(ctx: Context, next: any) {
  // fetch params
  const options: { [x: string]: any } = ctx.request.query;
  // some custom check todo

  // do business,
  const filter = options;
  const data = await StudentModel.find(filter).catch((e) => {
    throw new StudentError('04', e.message);
  });
  // res web
  ctx.response.status = 200;
  ctx.response.body = {
    code: 0,
    data,
  };
  await next();
}
