/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit("/dashboard");
});

describe("Dashboard page", () => {
  context("access", () => {
    it("is not avaible to employees.", () => {
      cy.validatePathname("/unauthorized");
    });
  });
});

export {};
