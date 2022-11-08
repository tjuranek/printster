/// <reference types="cypress" />

const authenticatedRoute = "/tasklist";

before(() => {
  cy.resetDb();
});

describe("Authenticated page", () => {
  context("visitor", () => {
    it("who is an admin can access an authenticated route.", () => {
      cy.loginAdmin();
      cy.visit(authenticatedRoute);
      cy.validatePathname(authenticatedRoute);
    });
  });

  context("navbar", () => {
    it("has links only accessible to admins when admin logged in.", () => {
      cy.loginAdmin();
      cy.visit(authenticatedRoute);

      cy.getByTestId("navbar-title").click();
      cy.validatePathname("/dashboard");

      cy.getByTestId("navbar-dashboard-link").click();
      cy.validatePathname("/dashboard");

      cy.getByTestId("navbar-task-list-link").click();
      cy.validatePathname("/tasklist");

      cy.getByTestId("navbar-employees-link").click();
      cy.validatePathname("/employees");

      cy.getByTestId("navbar-jobs-link").click();
      cy.validatePathname("/jobs");

      cy.getByTestId("navbar-machines-link").click();
      cy.validatePathname("/machines");
    });
  });
});

export {};
