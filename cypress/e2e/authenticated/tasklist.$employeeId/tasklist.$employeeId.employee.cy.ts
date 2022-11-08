/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit("/tasklist/2");
});

describe("Task List employee page", () => {
  context("access", () => {
    it("is not avaible to employees.", () => {
      cy.validatePathname("/unauthorized");
    });
  });
});

export {};
