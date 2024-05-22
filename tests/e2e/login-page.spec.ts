import { test, expect } from '@playwright/test';
import { LoginPage } from '../../app/pages/login-page';
import { ContactList } from '../../app/pages/contact_list-page';
import { csvReader } from '../../utils/helpers/csv-helper';

test.describe('Login page', () => {
  const invalidLoginData = csvReader('utils/data/csv-files/invalid-login-data.csv');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(
    'Log in with valid data',
    {
      tag: ['@e2e', '@regression', '@smoke']
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const contactList = new ContactList(page);

      await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
      await loginPage.getButtonByName('Submit').click();
      await expect(contactList.title).toHaveText('Contact List');
    }
  );

  for (const record of invalidLoginData) {
    test(
      `Log in with invalid data: ${record.testID}`,
      {
        tag: ['@e2e', '@regression']
      },
      async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillForm(record.email, record.password);
        await loginPage.getButtonByName('Submit').click();
      }
    );
  }
});
