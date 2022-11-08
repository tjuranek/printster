/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit("/tasklist");
});

describe("Task List page", () => {
  context("access", () => {
    it("is avaible to admins.", () => {
      cy.validatePathname("/tasklist");
    });
  });

  context("employee select", () => {
    it("renders when an admin views the page.", () => {
      cy.getByTestId("employee-select");
    });

    it("navigates to employee task list when new employee selected.", () => {
      cy.getByTestId("employee-select").select("Tony Boulder");
    });
  });
});

export {};
