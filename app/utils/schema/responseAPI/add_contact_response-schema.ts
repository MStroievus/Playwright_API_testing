import Joi from 'joi';
import { AddContactEndpoint } from '../../types/api/endpoints/AddContact';


export class AddContactResponseSchemas {
  static addContactSchema = (user: Partial<AddContactEndpoint>) => {
    return Joi.object({
      _id: Joi.string().alphanum().required(),
      firstName: Joi.string().required().valid(user.firstName),
      lastName: Joi.string().required().valid(user.lastName),
      birthdate: user.birthdate ? Joi.string().valid(user.birthdate).optional() : Joi.string().optional(),
      email: user.email ? Joi.string().email().valid(user.email).optional() : Joi.string().email().optional(),
      phone: user.phone ? Joi.string().valid(user.phone.toString()).optional() : Joi.string().optional(),
      street1: user.street1 ? Joi.string().valid(user.street1).optional() : Joi.string().optional(),
      street2: user.street2 ? Joi.string().valid(user.street2).optional() : Joi.string().optional(),
      city: user.city ? Joi.string().valid(user.city).optional() : Joi.string().optional(),
      stateProvince: user.stateProvince ? Joi.string().valid(user.stateProvince).optional() : Joi.string().optional(),
      postalCode: user.postalCode ? Joi.string().valid(user.postalCode.toString()).optional() : Joi.string().optional(),
      country: user.country ? Joi.string().valid(user.country).optional() : Joi.string().optional(),
      owner: Joi.string().alphanum().required(),
      __v: Joi.number().required()
    });
  };

  static missingRequiredFieldErrorSchema = (fieldName: string) => {
    return Joi.object({
      errors: Joi.object().pattern(
        Joi.string().valid(fieldName),
        Joi.object({
          name: Joi.string().equal("ValidatorError"),
          message: Joi.string().equal(`Path \`${fieldName}\` is required.`),
          properties: Joi.object({
            message: Joi.string().equal(`Path \`${fieldName}\` is required.`),
            type: Joi.string().required(),
            path: Joi.string().required()
          }).required(),
          kind: Joi.string().required(),
          path: Joi.string().required()
        }).required()
      ).required(),
      _message: Joi.string().equal("Contact validation failed"),
      message: Joi.string().equal(`Contact validation failed: ${fieldName}: Path \`${fieldName}\` is required.`)
    });
  };
}

