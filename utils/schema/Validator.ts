import test, { APIResponse } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';
import Joi from 'joi';

const ajv = new Ajv();

type ValidateSchemaProps<T> = {
  schema: JSONSchemaType<T>;
  json: T | T[];
};

type ValidateResponseProps<T> = {
  schema: Joi.ObjectSchema<T>;
  response: APIResponse;
};

export class Validation {
  async requestValidateSchema<T>({ schema, json }: ValidateSchemaProps<T>) {
    await test.step('Validating json schema', async () => {
      const validate = ajv.compile(schema);

      if (!validate(json)) {
        const prettyJson = JSON.stringify(json, null, 2);
        const prettyError = JSON.stringify(validate.errors, null, 2);
        throw Error(`Schema validation error: ${prettyError}\nJSON: ${prettyJson}`);
      }
    });
  }

  async responseValidationSchema<T>({ schema, response }: ValidateResponseProps<T>) {
    await test.step('Validating response schema', async () => {
      const responseBody = await response.json();

      const { error } = schema.validate(responseBody);
      if (error) {
        const prettyResponse = JSON.stringify(responseBody, null, 2);
        throw Error(`Response validation error: here error -->${error.message}\nResponse: ${prettyResponse}`);
      }
    });
  }
}
