import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/performance',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI ? [['line']] : [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4174/adventure/',
    headless: true,
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4174',
    url: 'http://127.0.0.1:4174/adventure/',
    reuseExistingServer: false,
    timeout: 30_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
