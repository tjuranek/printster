import { test, expect, request } from '@playwright/test';
import { execSync } from 'child_process';

test.describe('Login page', () => {
  test.beforeAll(() => {
    execSync('npm run db:seed');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('cookie', () => {
    test('should be set after an admin logs in.', async ({ page }) => {
      const requestContext = await request.newContext();

      await requestContext.post(
        'http://localhost:3000/?index=&_data=routes%2Findex',
        {
          form: {
            username: 'amyfinch',
            password: 'admin'
          }
        }
      );

      const storageState = await requestContext.storageState();
      const sessionCookie = storageState.cookies.find(
        (cookie) => cookie.name === '__session'
      );
      expect(sessionCookie).not.toBeUndefined();

      await requestContext.dispose();
    });

    test.describe('form', () => {
      test('successfully logs in with admin credentials.', async ({ page }) => {
        await page.locator(`data-test-id=login-form-username`).type('amyfinch');
        await page.locator(`data-test-id=login-form-password`).type('admin');
        await page.locator(`data-test-id=login-form-submit`).click();

        await page.waitForNavigation();
        expect(page.url()).toBe('http://localhost:3000/dashboard');
      });
    });
  });
});
