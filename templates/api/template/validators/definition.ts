import joi from 'joi';

export const schema = joi.object({
  _id: joi
    .string()
    .length(24)
    .alter({
      get: (schema) => schema.required(),
    }),
  serial: joi.number().alter({
    post: (schema) => schema.required(),
  }),
  name: joi.string(),
  gender: joi.string(),
  status: joi.string(),
});

// for post put
export const postSchema = schema.tailor('post');

// for get/:id, delete/:id, patch
export const getSchema = schema.tailor('get');
