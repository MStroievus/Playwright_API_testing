import { expect } from '@playwright/test';
import { LogInUserSchema } from '../../utils/schema/requestAPI/user_request_schema';
import { ValidationLogInUserResponseSchema } from '../../utils/schema/responseAPI/user_request-schema';
import { test } from '../../app/fixture/combineFixture/users-client-api-fixture';
import '../../utils/extensions/extensions-expect'

const userAuth = {
  email: process.env.TEST_USER_EMAIL!,  //--> знак оклику каже що в нас точно є вони, що TS не видавав помилку
  password: process.env.TEST_USER_PASSWORD!
};


test.describe('Users', async () => {

  test('Check status Log in user with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ usersAPIClient }) => {
      const response = await usersAPIClient.getLogInUserAPI(userAuth);

      expect(response).toHaveStatusCode(200);
      expect(response).toHaveStatusText('OK');

    }
  );
  test('Check response Log in user with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ usersAPIClient, validation }) => {
      const response = await usersAPIClient.getLogInUserAPI(userAuth);

      await validation.requestValidateSchema({ schema: LogInUserSchema, json: userAuth });
      await validation.responseValidationSchema({ schema: ValidationLogInUserResponseSchema.LogInUserResponseSchema(), response: response });
    }
  );
});
