import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : 3,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    // {
    //   name: 'setup local storage',
    //   testMatch: /local_storage\.setup\.ts/,
    // },
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
      //dependencies: ['setup local storage'],
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-first-failure',
      },
    },
  ],
});
