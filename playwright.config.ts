import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();
export default defineConfig(
  {
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 10 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 10 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Base URL to use in actions like `await page.goto('/')`. */


      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: 'e2e',
        use: { ...devices['Desktop Chrome'] },
      },
    ]
  });
