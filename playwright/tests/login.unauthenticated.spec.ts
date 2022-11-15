import { test, expect } from '../fixtures';
import { hasSessionCookie } from '../utils';

test.describe('Login page', () => {
  test.beforeEach(async ({ unauthenticatedPage: { page } }) => {
    await page.goto('/');
  });

  test.describe('cookie', () => {
    test('should not be set by default.', async ({
      unauthenticatedPage: { page }
    }) => {
      expect(await hasSessionCookie(page)).toBe(false);
    });
  });

  test.describe('form', () => {
    test('renders when the page loads.', async ({
      unauthenticatedPage: { page }
    }) => {
      page.locator('data-test-id=login-form');
    });

    test('shows error state when no data is submitted.', async ({
      unauthenticatedPage: { page }
    }) => {
      await page.locator(`data-test-id=login-form-submit`).click();

      expect(page.locator(`data-test-id=login-form-error`)).not.toBeUndefined();

      expect(page.locator(`data-test-id=login-form-username`)).toHaveClass(
        /input-error/
      );

      expect(page.locator(`data-test-id=login-form-password`)).toHaveClass(
        /input-error/
      );
    });

    test('shows error state when username is ommitted.', async ({
      unauthenticatedPage: { page }
    }) => {
      await page.locator(`data-test-id=login-form-username`).type('username');
      await page.locator(`data-test-id=login-form-submit`).click();

      expect(page.locator(`data-test-id=login-form-error`)).not.toBeUndefined();

      expect(page.locator(`data-test-id=login-form-username`)).toHaveClass(
        /input-error/
      );

      expect(page.locator(`data-test-id=login-form-password`)).toHaveClass(
        /input-error/
      );
    });

    test('shows error state when password is ommitted.', async ({
      unauthenticatedPage: { page }
    }) => {
      await page.locator(`data-test-id=login-form-password`).type('password');
      await page.locator(`data-test-id=login-form-submit`).click();

      expect(page.locator(`data-test-id=login-form-error`)).not.toBeUndefined();

      expect(page.locator(`data-test-id=login-form-username`)).toHaveClass(
        /input-error/
      );

      expect(page.locator(`data-test-id=login-form-password`)).toHaveClass(
        /input-error/
      );
    });
  });
});
