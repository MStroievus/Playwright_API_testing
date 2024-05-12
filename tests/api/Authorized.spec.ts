import test from '@playwright/test';
import { AuthAPIClient } from '../../app/api/AuthAPIClient';
import { APIContextFactory } from '../../app/context/contextFactory';
import { AuthenticatedAPIContext } from '../../app/context/AuthorizatedContext';

test.describe('Authorized', async () => {
  test('Authorized with valid credentials', async ({ request }) => {
    const userAuth = {
      email: 'tomato_gn1@i.ua',
      password: 'CreataMaX'
    };

    const context = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth))
    const authAPIClient = new AuthAPIClient(context);

    const response = await authAPIClient.getLogInUserAPI(userAuth);
    console.log(await response.json());
  });
});
