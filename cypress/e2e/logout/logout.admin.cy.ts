/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

describe("Logout page", () => {
  it("should log out a logged in admin.", () => {
    cy.loginAdmin();
    cy.validateUserCookie(true);
    cy.visit("/logout");
    cy.validateUserCookie(false);
  });
});

export {};
