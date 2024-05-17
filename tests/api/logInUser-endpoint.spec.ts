import { expect } from '@playwright/test';
import { test } from '../../app/fixture/combineFixture/users-client-api-fixture';
import '../../utils/extensions/extensions-expect'
import { LogInUserRequestSchemas } from '../../utils/schema/requestAPI/log_in_users_request-schema';
import { LogInUserResponseSchemas } from '../../utils/schema/responseAPI/log_in_user_response-schema';

const userAuth = {
  email: process.env.TEST_USER_EMAIL!,  //--> знак оклику каже що в нас точно є вони, щоб TS не видавав помилку
  password: process.env.TEST_USER_PASSWORD!
};


test.describe('Users', async () => {

  test('Check status LogInUser endpoint with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ usersAPIClient }) => {
      const response = await usersAPIClient.getLogInUserAPI(userAuth);

      expect(response).toHaveStatusCode(200);
      expect(response).toHaveStatusText('OK');

    }
  );
  test('Check response LogInUser endpoint with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ usersAPIClient, validation }) => {
      const response = await usersAPIClient.getLogInUserAPI(userAuth);

      await validation.requestValidateSchema({ schema: LogInUserRequestSchemas.logInUserSchema(), json: userAuth });
      await validation.responseValidationSchema({ schema: LogInUserResponseSchemas.logInUserResponseSchema(), response: response });
    }
  );
});
