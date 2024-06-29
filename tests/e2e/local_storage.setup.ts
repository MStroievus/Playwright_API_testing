import { expect, test as setup } from '@playwright/test';
import { AuthUser } from '../../app/utils/types/api/endpoints/LogInUser';
import { APIContextFactory } from '../../app/context/context-factory';
import { ApiContext } from '../../app/utils/constants/Contexts';
import { UsersAPIClient } from '../../app/api/users-api-client';
import { PageUrl } from '../../app/utils/constants/pages';
import { LoginPage } from '../../app/pages/login-page';
import { ContactListPage } from '../../app/pages/contact_list-page';

const data: AuthUser = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!

}

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {

  // By API не буде працювати на цьому сайті але для прикладу залишу тут 
  // const context = await APIContextFactory.contextFactory(ApiContext.BaseAPIContext);
  // const usersAPIClient = new UsersAPIClient(context);
  // await usersAPIClient.getLogInUserAPI(data)

  // await context.storageState({ path: authFile })

  // BY UI
  const loginPage = new LoginPage(page)
  const contactList = new ContactListPage(page)
  await page.goto(PageUrl.homePage);
  await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
  await loginPage.getButtonByName('Submit').click();
  await expect(contactList.title).toHaveText('Contact List');

  await page.context().storageState({ path: authFile });

});