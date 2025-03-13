import { Document, PaginateModel } from 'mongoose';

/**
 * - 规范一个基本的RESTful API 所具备的必要流程, 这里提供的是一个模板，场景与模版使用场景相符的，可以直接继承使用，使用场景不符合的，可以ctrl cv 借鉴。
 *  - 流程:
 *      1. 数据体schema校验
 *      2. 接口业务性校验
 *      3. 与数据库的交互
 *      4. 返回数据
 * - todo list
 *  1. 这个模版依赖于mongoose, 后期发布出去，做成兼容其他数据库的版本
 */
abstract class RestAdapter<T extends Document> {
  public model: PaginateModel<T>;
  public validators: { [x: string]: any };
}

export { RestAdapter };
