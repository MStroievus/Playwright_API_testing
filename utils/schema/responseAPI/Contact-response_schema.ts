import Joi from 'joi';

export const AddContactResponseSchema = Joi.object({
  _id: Joi.string().alphanum().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthdate: Joi.string().isoDate().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).required(),
  street1: Joi.string().required(),
  street2: Joi.string().optional(),
  city: Joi.string().required(),
  stateProvince: Joi.string().required(),
  postalCode: Joi.string().pattern(/^[0-9]+$/).required(),
  country: Joi.string().required(),
  owner: Joi.string().alphanum().required(),
  __v: Joi.number().required()
});