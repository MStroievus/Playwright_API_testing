import { expect, test } from '@playwright/test';
require('dotenv').config();

test.describe('Suits', () => {
  test('has title', async ({ page }) => {
    await page.goto('');
  });
});
