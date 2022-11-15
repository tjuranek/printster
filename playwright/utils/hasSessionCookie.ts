import type { Cookie, Page } from '@playwright/test';

function isSessionCookie(cookie: Cookie) {
  return cookie.name === '__session';
}

/**
 * Returns a boolean based on if the passed in page has a
 * session cookie.
 */
export async function hasSessionCookie(page: Page) {
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(isSessionCookie);

  return Boolean(sessionCookie);
}
