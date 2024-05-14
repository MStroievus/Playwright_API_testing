import test from '@playwright/test';
import { AuthAPIClient } from '../../app/api/AuthAPIClient';
import { APIContextFactory } from '../../app/context/ContextFactory';
import { ApiContext } from '../../utils/constants/Contexts';

test.describe('Authorized', async () => {
  test('Authorized with valid credentials', async ({ }) => {
    const userAuth = {
      email: 'tomato_gn1@i.ua',
      password: 'CreataMaX'
    };

    const context = await APIContextFactory.contextFactory(ApiContext.BaseContext)
    const authAPIClient = new AuthAPIClient(context);

    const response = await authAPIClient.getLogInUserAPI(userAuth);
    console.log(await response.json());
  });
});
