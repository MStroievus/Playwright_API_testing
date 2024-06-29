import { defineConfig, devices } from '@playwright/test';
import { PageUrl } from './app/utils/constants/pages';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default defineConfig({
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup local storage',
      testMatch: /local_storage\.setup\.ts/,
      use: {
        baseURL: PageUrl.homePage
      }
    },
    {
      name: 'api',
      grep: /@api/,
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-first-failure',
      },
    },
    {
      name: 'e2e',
      grep: /@e2e/,
      dependencies: ['setup local storage'],
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-first-failure',
        headless: true,
        baseURL: PageUrl.homePage
      },
    },
    {
      name: 'e2eFixture',
      grep: /@fixture/,
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-first-failure',
        headless: true,
        baseURL: PageUrl.homePage
      },
    },
  ],
});
