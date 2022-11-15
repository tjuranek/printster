import { test as base } from '@playwright/test';
import { AdminPage, EmployeePage, UnauthenticatedPage } from '../pages';

export { expect } from '@playwright/test';

type AppFixture = {
  adminPage: AdminPage;
  employeePage: EmployeePage;
  unauthenticatedPage: UnauthenticatedPage;
};

/**
 * Defines admin and user pages for use in application tests.
 */
export const test = base.extend<AppFixture>({
  adminPage: async ({ browser }, use) => {
    await use(await AdminPage.create(browser));
  },
  employeePage: async ({ browser }, use) => {
    await use(await EmployeePage.create(browser));
  },
  unauthenticatedPage: async ({ browser }, use) => {
    await use(await UnauthenticatedPage.create(browser));
  }
});
