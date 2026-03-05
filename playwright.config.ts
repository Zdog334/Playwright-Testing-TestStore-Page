import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // default directory for legacy tests
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://teststore.automationtesting.co.uk/index.php',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  outputDir: 'test-results/',
};

export default config;
