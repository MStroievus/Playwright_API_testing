import { expect, test } from '@playwright/test';
import { LoginPage } from '../../app/pages/login-page';

test('Login page', { tag: ['@e2e'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await loginPage.getButtonByName('Submit').click();
  await expect(page).toHaveURL('https://thinking-tester-contact-list.herokuapp.com/')
});

