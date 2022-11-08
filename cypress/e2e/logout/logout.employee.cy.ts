/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

describe("Logout page", () => {
  it("should not fail when no one was logged in.", () => {
    cy.visit("/logout");
    cy.validateUserCookie(false);
    cy.validatePathname("/");
  });

  it("should log out a logged in employee.", () => {
    cy.loginEmployee();
    cy.validateUserCookie(true);
    cy.visit("/logout");
    cy.validateUserCookie(false);
  });
});

export {};
