import type { Browser, Page } from '@playwright/test';

/**
 * Page object model for re-using a logged in admin user.
 */
export class AdminPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async create(browser: Browser) {
    const context = await browser.newContext({
      storageState: 'playwright/storage/adminStorageState.json'
    });

    const page = await context.newPage();

    return new AdminPage(page);
  }
}
