import { ConsoleMessage, Page, test as base, BrowserContext } from '@playwright/test';

export type BasePage = {
  page: Page;
  baseContext: BrowserContext;
};

export const basePageFixture = base.extend<BasePage>({
  baseContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
  },

  page: async ({ baseContext }, use) => {
    const page = await baseContext.newPage();

    page.on('console', async (msg: ConsoleMessage) => {
      if (msg.type() === 'error') {
        await page.screenshot({ path: `error-screenshot-${Date.now()}.png` });
        throw new Error('Console error: ' + msg.text());
      }
      page.on('pageerror', async (err) => {
        await page.screenshot({ path: `pageerror-screenshot-${Date.now()}.png` });
        throw new Error('Page error: ' + err.message);
      });
    });

    await use(page);
  }
});

