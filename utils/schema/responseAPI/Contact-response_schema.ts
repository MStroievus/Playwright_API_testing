import Joi from 'joi';
import { AddContact } from '../../types/api/Endpoints/AddContact';


export class ValidationAddContactResponseSchema {
  static addContactResponseSchema = (user: AddContact) => {
    return Joi.object({
      _id: Joi.string().alphanum().required(),
      firstName: Joi.string().required().valid(user.firstName),
      lastName: Joi.string().required().valid(user.lastName),
      birthdate: Joi.string().valid(user.birthdate),
      email: Joi.string().email().valid(user.email),
      phone: Joi.string().valid(user.phone?.toString()),
      street1: Joi.string().valid(user.street1),
      street2: Joi.string().valid(user.street2),
      city: Joi.string().valid(user.city),
      stateProvince: Joi.string().valid(user.stateProvince),
      postalCode: Joi.string().valid(user.postalCode?.toString()),
      country: Joi.string().valid(user.country),
      owner: Joi.string().alphanum().required(),
      __v: Joi.number().required()
    });
  };

  static missingRequiredFieldAddContactErrorResponseSchema = (fieldName: string) => {
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

