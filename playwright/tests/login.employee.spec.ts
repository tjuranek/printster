import { test, expect } from '../fixtures';
import { hasSessionCookie } from '../utils';

test.describe('Login page', () => {
  test.beforeEach(async ({ employeePage: { page } }) => {
    await page.goto('/');
  });

  test.describe('cookie', () => {
    test('should be set after an employee logs in.', async ({
      employeePage: { page }
    }) => {
      expect(await hasSessionCookie(page)).toBe(true);
    });
  });

  test.describe('form', () => {
    test('successfully logs in with employee credentials.', async ({
      unauthenticatedPage: { page }
    }) => {
      await page.goto('/');
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
