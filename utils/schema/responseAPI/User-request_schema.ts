import Joi from 'joi';

//? Ідея полягає в тому щоб  протестувати всі можливі,  респонси(оцікувані помилки в  нашому апі клієнті), з моєї практики це 4-12 оціваних респонсів які схожі між собою
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


//export const LogInUserResponseSchemaInvalidEmail = Joi.object({
//   some expected response
// }).required();

//export const LogInUserResponseSchemaInvalidPassword = Joi.object({
//    some expected response
// }).required();