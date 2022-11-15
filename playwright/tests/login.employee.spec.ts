import { execSync } from 'child_process';
import { test, expect } from '../fixtures';
import { hasSessionCookie } from '../utils';

test.describe('Login page', () => {
  test.beforeAll(() => {
    execSync('npm run db:seed');
  });

  test.describe('cookie', () => {
    test('should not be set by default.', async ({ unauthenticatedPage }) => {
      expect(await hasSessionCookie(unauthenticatedPage.page)).toBe(false);
    });

    test('should be set after an employee logs in.', async ({
      employeePage
    }) => {
      expect(await hasSessionCookie(employeePage.page)).toBe(true);
    });
  });
});

    /**
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
    */
  });
});
