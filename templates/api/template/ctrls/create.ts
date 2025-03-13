import { Context } from 'koa';
import { IStudent } from '../models';
import { StudentModel } from '../models';
import { validate } from '../validators';
import { StudentError } from '../errors/student.error';

/**
 * create one or many Student instance
 * @param ctx
 * @param next
 */
export async function create(ctx: Context, next: any) {
  // fetch params
  const students: IStudent[] = Array.isArray(ctx.request.body)
    ? ctx.request.body
    : [ctx.request.body];
  // validate
  validate(students, true);
  // do business
  const data = await StudentModel.create(students).catch((e) => {
    throw new StudentError('01', e.message);
  });
  // res web
  ctx.response.status = 200;
  ctx.response.body = {
    code: 0,
    data,
  };
  await next();
}
