import Joi from 'joi';

export const AddContactResponseSchema = Joi.object({
  _id: Joi.string().alphanum().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthdate: Joi.string().isoDate(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]+$/),
  street1: Joi.string(),
  street2: Joi.string(),
  city: Joi.string(),
  stateProvince: Joi.string(),
  postalCode: Joi.string().pattern(/^[0-9]+$/),
  country: Joi.string(),
  owner: Joi.string().alphanum().required(),
  __v: Joi.number().required()
});


export const MissingFirstNameRequiredFieldAddContactErrorResponseSchema = Joi.object({
  errors: Joi.object({
    firstName: Joi.object({
      name: Joi.string().required(),
      message: Joi.string().required(),
      properties: Joi.object({
        message: Joi.string().required(),
        type: Joi.string().required(),
        path: Joi.string().required()
      }).required(),
      kind: Joi.string().required(),
      path: Joi.string().required()
    }).required()
  }).required(),
  _message: Joi.string().required(),
  message: Joi.string().required()
});


export const MissingLastNameRequiredFieldAddContactErrorResponseSchema = Joi.object({
  errors: Joi.object({
    lastName: Joi.object({
      name: "ValidatorError",
      message: Joi.string().required(),
      properties: Joi.object({
        message: Joi.string().required(),
        type: Joi.string().required(),
        path: Joi.string().required()
      }).required(),
      kind: Joi.string().required(),
      path: Joi.string().required()
    }).required()
  }).required(),
  _message: Joi.string().required(),
  message: Joi.string().required()
});
