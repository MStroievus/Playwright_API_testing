import { expect } from "@playwright/test";
import { test } from "../../app/fixture/users_api_client-fixture";
import { LogInUserRequestSchemas } from "../../app/utils/schema/requestAPI/log_in_users_request-schema";
import { LogInUserResponseSchemas } from "../../app/utils/schema/responseAPI/log_in_user_response-schema";
import '../../app/utils/extensions/extensions-expect';

const userAuth = {
  email: process.env.TEST_USER_EMAIL!,
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
