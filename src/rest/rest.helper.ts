import { Document } from 'mongoose';
import { Context } from 'koa';
import { validate } from '../utils';
import { RestError } from './rest.error';
import joi from 'joi';
import { ObjectId } from 'mongodb';
import { RestAdapter } from './rest.adapter';

class RestHelper<T extends Document> {
  constructor(private adapter: RestAdapter<T>) {}

  /**
   * 新建，单个和多个都可以
   * @param ctx
   * @param next
   */
  async create(ctx: Context, next: any) {
    // fetch params
    const ts: T[] = [].concat(ctx.request.body);
    // validate
    const errors: joi.ValidationError[] = validate(
      ts,
      this.adapter.validators.CreateValidator
    );
    if (errors.length) throw new RestError('01', errors.toString());
    // do business
    let data = [];
    try {
      data = await this.adapter.model.create(ts);
    } catch (e) {
      throw new RestError('02', e.message);
    }
    // res web
    ctx.response.status = 200;
    ctx.response.body = {
      code: 0,
      data,
    };
    await next();
  }

  /**
   * 更新, 全schema校验，数据库不存在则更新
   * @param ctx
   * @param next
   */
  async put(ctx: Context, next: any) {
    // fetch params
    const ts: T[] = [].concat(ctx.request.body);
    // validate
    validate(ts, this.adapter.validators.PutValidator);
    // do business
    const data = {
      total: ts.length,
      failed: [],
      success: [],
    };
    for (const t of ts) {
      t._id = t._id || new ObjectId();
      try {
        const res = await this.adapter.model.findOneAndUpdate(
          { _id: t._id },
          {
            $set: t,
          },
          {
            new: true,
            upsert: true,
          }
        );
        if (!res) data.failed.push(t);
        else data.success.push(t);
      } catch (error) {
        console.error(error);
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
  /**
   * 更新，增量更新，只校验_id, 不存在不更新
   * @param ctx
   * @param next
   */
  async patch(ctx: Context, next: any) {
    // fetch params
    const ts: T[] = [].concat(ctx.request.body);
    // validate
    validate(ts, this.adapter.validators.PatchValidator);
    // do business
    const data = {
      total: ts.length,
      failed: [],
      success: [],
    };
    for (const t of ts) {
      try {
        const res = await this.adapter.model.findOneAndUpdate(
          { _id: t._id },
          {
            $set: t,
          },
          {
            new: true,
            upsert: false,
          }
        );
        if (!res) data.failed.push(t);
        else data.success.push(t);
      } catch (error) {
        console.error(error);
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

  /**
   * 根据_id 返回单个对象
   * @param ctx
   * @param next
   */
  async findOne(ctx: Context, next: any) {
    // fetch params
    const { _id } = ctx.params;
    // validate
    validate({ _id }, this.adapter.validators.findOneValidator);
    // do business
    const data = await this.adapter.model.findOne({ _id }).catch((e) => {
      throw new RestError('03', e.message);
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
   * 根据查询条件返回多个对象
   * @param ctx
   * @param next
   */
  async findMany(ctx: Context, next: any) {
    // fetch params
    const options: any = ctx.request.query;
    // do business,
    const filter = options;
    const data = await this.adapter.model.find(filter).catch((e) => {
      throw new RestError('04', e.message);
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
   * 根据_id删除单个对象
   * @param ctx
   * @param next
   */
  async delete(ctx: Context, next: any) {
    // fetch params
    const { _id } = ctx.params;
    // validate
    validate({ _id }, this.adapter.validators.DeleteValidator);
    // do business
    const data = await this.adapter.model.deleteOne({ _id }).catch((e) => {
      throw new RestError('02', e.message);
    });
    // res web
    ctx.response.status = 200;
    ctx.response.body = {
      code: 0,
      data,
    };
    await next();
  }
}

export { RestHelper };
