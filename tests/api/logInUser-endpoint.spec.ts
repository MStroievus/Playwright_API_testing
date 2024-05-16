import test, { expect } from '@playwright/test';
import { AuthAPIClient } from '../../app/api/auth-api-client';
import { APIContextFactory } from '../../app/context/context-factory';
import { ApiContext } from '../../utils/constants/contexts';
import { Validation } from '../../utils/schema/validator';
import { LogInUserSchema } from '../../utils/schema/requestAPI/user_request_schema';
import { LogInUserResponseSchema } from '../../utils/schema/responseAPI/user_request-schema';
import '../../utils/extensions/extensions-expect'









const userAuth = {
  email: 'tomato_gn1@i.ua',
  password: 'CreataMaX'
};

test.describe('Users', async () => {

  test('Check status Log in user with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ }) => {
      const context = await APIContextFactory.contextFactory(ApiContext.BaseContext);
      const authAPIClient = new AuthAPIClient(context);

      const response = await authAPIClient.getLogInUserAPI(userAuth);
      expect(response).toHaveStatusCode(200);
      expect(response).toHaveStatusText('OK');
    }
  );
  test('Check response Log in user with valid data', {
    tag: ['@smoke', '@api', '@regression']
  },
    async ({ }) => {
      const context = await APIContextFactory.contextFactory(ApiContext.BaseContext);
      const authAPIClient = new AuthAPIClient(context);
      const validation = new Validation();

      const response = await authAPIClient.getLogInUserAPI(userAuth);
      await validation.requestValidateSchema({ schema: LogInUserSchema, json: userAuth });
      await validation.responseValidationSchema({ schema: LogInUserResponseSchema, response: response });
    }
  );
});
