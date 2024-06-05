import { APIRequestContext, test as setup } from '@playwright/test';;
import { UsersAPIClient } from '../../app/api/users-api-client';
import { APIContextFactory } from '../../app/context/context-factory';
import { ApiContext } from '../../app/utils/constants/Contexts';



const authFile = '.auth/user.json';
const userAuth = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!
};

setup('Local storage', async ({ }) => {
  const context: APIRequestContext = await APIContextFactory.contextFactory(ApiContext.BaseAPIContext);
  const usersAPIClient = new UsersAPIClient(context);
  await usersAPIClient.getLogInUserAPI(userAuth);
  await context.storageState({ path: authFile });
  await context.dispose();
});



