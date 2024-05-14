import test, { expect } from '@playwright/test';
import { AuthAPIClient } from '../../app/api/AuthAPIClient';
import { APIContextFactory } from '../../app/context/ContextFactory';
import { ApiContext } from '../../utils/constants/Contexts';
import playwrightApiMatchers from 'odottaa';
import { Validation } from '../../utils/schema/Validator';
import { LogInUserSchema } from '../../utils/schema/requestAPI/User-request_schema';
import { LogInUserResponseSchema } from '../../utils/schema/responseAPI/User-request_schema';
expect.extend(playwrightApiMatchers);

const userAuth = {
  email: 'tomato_gn1@i.ua',
  password: 'CreataMaX'
};


test.describe('Users', async () => {
  test('Log in user', async ({ }) => {

    const context = await APIContextFactory.contextFactory(ApiContext.BaseContext)
    const authAPIClient = new AuthAPIClient(context);
    const validation = new Validation()

    const response = await authAPIClient.getLogInUserAPI(userAuth);
    expect(response).toHaveStatusCode(200)
    expect(response).toHaveStatusText("OK")
    await validation.requestValidateSchema({ schema: LogInUserSchema, json: userAuth })
    await validation.responseValidationSchema({ schema: LogInUserResponseSchema, response: response })

  });
});
