import { BrowserContext, test, } from '@playwright/test';
import { AddContactPage } from '../../app/pages/add_contact-page';
import { formsData } from '../../utils/model/add_contact_page-model';
import { PageUrl } from '../../utils/constants/pages';
import { LoginPage } from '../../app/pages/login-page';
import { ContactList } from '../../app/pages/contact_list-page';
import '../../utils/extensions/extensions-expect';
import { ContextFactory } from '../../app/context/context-factory';
import { ApiContext } from '../../utils/constants/contexts';
import { ApiAuth, AuthUser } from '../../utils/types/api/endpoints/logInUser';
import { AuthenticatedStorageContext } from '../../app/context/authorized_local_storage-context';

test.describe('Add contact', () => {
  test(
    'Update contact',
    {
      tag: ['@e2e', '@regression', '@smoke']
    },
    async ({ page }) => {
      await page.goto(PageUrl.homePage);
      const loginPage = new LoginPage(page);
      const contactList = new ContactList(page);
      await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
      await loginPage.getButtonByName('Submit').click();
      await contactList.addANewContactButton.click();
      const addContactPage = new AddContactPage(page);
      await addContactPage.fillForm(formsData);
      await addContactPage.submitButton.click();
      await contactList.getNeedContact(formsData)
      await addContactPage.clearForm()
    }
  );

  test.only('Update contact1', async ({ page }) => {
    const testUser: AuthUser = {
      email: process.env.TEST_USER_EMAIL!,
      password: process.env.TEST_USER_PASSWORD!
    };
    const user: ApiAuth = { user: testUser };


    const contactList = new ContactList(page);
    const addContactPage = new AddContactPage(page);

    await contactList.addANewContactButton.click();
    await addContactPage.fillForm(formsData);
    await addContactPage.submitButton.click();
    await contactList.getNeedContact(formsData);
    await addContactPage.clearForm();
  });
})