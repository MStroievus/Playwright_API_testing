import Joi from 'joi';

export const LogInUserResponseSchema = Joi.object({
  user: Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    __v: Joi.number().integer().required()
  }).required(),
  token: Joi.string().required()
}).required();