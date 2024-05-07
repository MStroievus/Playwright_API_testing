import { expect, test } from '@playwright/test';
import { URL } from 'url';

test.describe('Suits', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    // Add your test assertions here
  });
});
