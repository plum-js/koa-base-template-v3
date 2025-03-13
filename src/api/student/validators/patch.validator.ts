import joi from 'joi';

export const PatchValidator = {
  request: {
    body: joi.object({
      _id: joi.string().length(24),
      serial: joi.number(),
      name: joi.string(),
      gender: joi.string(),
      status: joi.string(),
    }),
  },
  response: {
    '200': {
      description: '执行完成',
      schema: joi.any(),
    },
  },
  summary: 'create',
};
