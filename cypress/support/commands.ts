/// <reference types="cypress" />

Cypress.Commands.add("loginAdmin", () => {
  const username = "amyfinch";
  const password = "admin";

  cy.request({
    method: "POST",
    url: "?index=&_data=routes%2Findex",
    form: true,
    body: {
      username,
      password,
    },
  });
});

Cypress.Commands.add("loginEmployee", () => {
  const username = "ryanjohnson";
  const password = "employee";

  cy.request({
    method: "POST",
    url: "?index=&_data=routes%2Findex",
    form: true,
    body: {
      username,
      password,
    },
  });
});

Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-test-id="${testId}"]`);
});

Cypress.Commands.add("resetDb", () => {
  cy.exec("npm run db:seed");
});

Cypress.Commands.add("validateUserCookie", (shouldBeSet: boolean) => {
  const cookieName = "__session";
  const chainer = shouldBeSet ? "exist" : "be.null";

  cy.getCookie(cookieName).should(chainer);
});

Cypress.Commands.add("validatePathname", (pathname: string) => {
  cy.location("pathname").should("equal", pathname);
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAdmin(): Chainable<void>;
      loginEmployee(): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      resetDb(): Chainable<void>;
      validatePathname(pathname: string): Chainable<void>;
      validateUserCookie(shouldBeSet: boolean): Chainable<void>;
    }
  }
}

export {};
