import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
require('dotenv').config();

const config: PlaywrightTestConfig = {
  fullyParallel: false,
  outputDir: './playwright/results',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],
  reporter: 'html',
  testDir: './playwright',
  use: {
    baseURL: 'http://localhost:3000',
    trace: {
      mode: 'on'
    }
  },
  webServer: {
    command: 'npm run dev',
    port: 3000
  },
  workers: 1
};

export default config;
