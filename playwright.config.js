import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.js', '**/*.spec.ts'],
  retries: 1,
  workers: 3,
  // workers: 13,
  /*Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  // reporter: [['allure-playwright']],
  // projects: [
  //   {
  //     name: 'safari',
  //     use: {

  //       browserName: 'webkit',
  //       headless: true,
  //       actionTimeout: 10 * 1000,
  //       navigationTimeout: 30 * 1000,
  //       screenshot: 'retain-on-failure',
  //       trace: 'on',//on,off,retain-on-failure
  //       // ...devices['iPhone 17 Pro Max'],
  //     },
  //   },
  //   {
  //     name: 'chrome',
  //     use: {
  //       browserName: 'chromium',
  //       headless: true,
  //       // actionTimeout: 10 * 1000,
  //       // navigationTimeout: 30 * 1000,
  //       screenshot: 'retain-on-failure',
  //       trace: 'on',//on,off,retain-on-failure
  //       // viewport: {width:720,height:720},
  //       ignoreHttpsErrors: true,
  //       permissions: ['geolocation'],
  //       video: 'retain-on-failure'

  //     },
  //   }
  // ]
  project: {
    name: 'chrome',
    use: {
      browserName: 'chromium',
      headless: true,
      // actionTimeout: 10 * 1000,
      // navigationTimeout: 30 * 1000,
      screenshot: 'retain-on-failure',
      trace: 'on',//on,off,retain-on-failure
      // viewport: {width:720,height:720},
      ignoreHttpsErrors: true,
      permissions: ['geolocation'],
      video: 'retain-on-failure'
    }

  }
});