// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: '../tests/playwright',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* 1 retry to handle transient CDN/network flakiness on live sites */
  retries: 1,
  /* 15s is sufficient for all personal-site interactions; file browser code panel sets its own higher timeout */
  timeout: 15000,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['dot'], ['html', { open: 'never' }]] : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/personal-site/**',
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: '**/personal-site/**',
    },

    {
      name: 'personal-site-chrome',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL || 'https://sarahncrowe.com' },
      testMatch: '**/personal-site/**/*.spec.ts',
    },

    {
      name: 'personal-site-firefox',
      use: { ...devices['Desktop Firefox'], baseURL: process.env.BASE_URL || 'https://sarahncrowe.com' },
      testMatch: '**/personal-site/**/*.spec.ts',
    },

    {
      name: 'personal-site-safari',
      use: { ...devices['Desktop Safari'], baseURL: process.env.BASE_URL || 'https://sarahncrowe.com' },
      testMatch: '**/personal-site/**/*.spec.ts',
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
