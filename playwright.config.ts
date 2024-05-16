import { defineConfig, devices } from '@playwright/test';


require('dotenv').config();
export default defineConfig(
  {
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 1,
    workers: process.env.CI ? 1 : 2,
    reporter: 'html',
    use: {
      trace: 'on-first-retry',
    },

    projects: [
      {
        name: 'e2e',
        use: { ...devices['Desktop Chrome'] },
      },
    ]
  });
