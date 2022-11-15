import type { Browser, Page } from '@playwright/test';

/**
 * Page object model for unauthenticated users.
 */
export class UnauthenticatedPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async create(browser: Browser) {
    const context = await browser.newContext();
    const page = await context.newPage();

    return new UnauthenticatedPage(page);
  }
}
