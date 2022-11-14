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
    test('should not be set by default.', async ({ page }) => {
      const cookies = await page.context().cookies();
      const cookie = cookies.find((cookie) => cookie.name === '__session');
      expect(cookie).toBeUndefined();
    });

    test('should be set after an employee logs in.', async ({ page }) => {
      const requestContext = await request.newContext();

      await requestContext.post(
        'http://localhost:3000/?index=&_data=routes%2Findex',
        {
          form: {
            username: 'ryanjohnson',
            password: 'employee'
          }
        }
      );

      const storageState = await requestContext.storageState();
      const sessionCookie = await storageState.cookies.find(
        (cookie) => cookie.name === '__session'
      );
      expect(sessionCookie).not.toBeUndefined();

      await requestContext.dispose();
    });

    test.describe('form', () => {
      test('renders when the page loads.', async ({ page }) => {
        await page.locator(`data-test-id=login-form`);
      });

      test('shows error state when no data is submitted.', async ({ page }) => {
        await page.locator(`data-test-id=login-form-submit`).click();

        expect(
          await page.locator(`data-test-id=login-form-error`)
        ).not.toBeUndefined();

        expect(
          await page.locator(`data-test-id=login-form-username`)
        ).toHaveClass(/input-error/);

        expect(
          await page.locator(`data-test-id=login-form-password`)
        ).toHaveClass(/input-error/);
      });

      test('shows error state when username is ommitted.', async ({ page }) => {
        await page
          .locator(`data-test-id=login-form-username`)
          .type('ryanjohnson');
        await page.locator(`data-test-id=login-form-submit`).click();

        expect(
          await page.locator(`data-test-id=login-form-error`)
        ).not.toBeUndefined();

        expect(
          await page.locator(`data-test-id=login-form-username`)
        ).toHaveClass(/input-error/);

        expect(
          await page.locator(`data-test-id=login-form-password`)
        ).toHaveClass(/input-error/);
      });

      test('shows error state when password is ommitted.', async ({ page }) => {
        await page.locator(`data-test-id=login-form-password`).type('employee');
        await page.locator(`data-test-id=login-form-submit`).click();

        expect(
          await page.locator(`data-test-id=login-form-error`)
        ).not.toBeUndefined();

        expect(
          await page.locator(`data-test-id=login-form-username`)
        ).toHaveClass(/input-error/);

        expect(
          await page.locator(`data-test-id=login-form-password`)
        ).toHaveClass(/input-error/);
      });

      test('successfully logs in with employee credentials.', async ({
        page
      }) => {
        await page
          .locator(`data-test-id=login-form-username`)
          .type('ryanjohnson');
        await page.locator(`data-test-id=login-form-password`).type('employee');
        await page.locator(`data-test-id=login-form-submit`).click();

        await page.waitForNavigation();
        expect(page.url()).toBe('http://localhost:3000/tasklist');
      });
    });
  });
});
