import type { Browser, Page } from '@playwright/test';

/**
 * Page object model for re-using a logged in employee.
 */
export class EmployeePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async create(browser: Browser) {
    const context = await browser.newContext({
      storageState: 'playwright/storage/employeeStorageState.json'
    });

    const page = await context.newPage();

    return new EmployeePage(page);
  }
}
