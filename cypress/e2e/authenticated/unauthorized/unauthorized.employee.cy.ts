/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit("/unauthorized");
});

describe("Unauthorized page", () => {
  context("access", () => {
    it("should be available to employees.", () => {
      cy.validatePathname("/unauthorized");
    });
  });

  context("go back button", () => {
    it("navigates backwards a page when clicked.", () => {
      cy.visit("/tasklist");
      cy.visit("/unauthorized");
      cy.getByTestId("navigate-back").click();
      cy.visit("/tasklist");
    });
  });
});

export {};
