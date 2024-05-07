import { test } from '@playwright/test';
require('dotenv').config();

test.describe('Suits', () => {
  test('has title', {
    tag: '@fast',
  }, async ({ page }) => {
    await page.goto(process.env.E2E_URL as string);
  });
});


