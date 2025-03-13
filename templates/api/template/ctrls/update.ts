import { Context } from 'koa';
import { IStudent } from '../models';
import { StudentModel } from '../models';
import { validate } from '../validators';
import { ObjectId } from 'mongodb';
/**
 * update one or many Student instance, create  if no documents match the filter
 * @param ctx
 * @param next
 */
export async function update(ctx: Context, next: any) {
  // fetch params
  const students: IStudent[] = Array.isArray(ctx.request.body)
    ? ctx.request.body
    : [ctx.request.body];
  // validate
  validate(students, true);
  // do business
  const data = {
    total: students.length,
    failed: [] as IStudent[],
    success: [] as IStudent[],
  };
  for (const t of students) {
    t._id = t._id || new ObjectId();
    try {
      const res = await StudentModel.findOneAndUpdate({ _id: t._id }, t, {
        new: true,
        upsert: true,
      });
      if (!res) data.failed.push(t);
      else data.success.push(t);
    } catch (e) {
      data.failed.push(t);
    }
  }
  // res web
  ctx.response.status = 200;
  ctx.response.body = {
    code: 0,
    data,
  };
  await next();
}
