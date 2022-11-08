/// <reference types="cypress" />

const authenticatedRoute = "/tasklist";

before(() => {
  cy.resetDb();
});

describe("Authenticated page", () => {
  context("visitor", () => {
    it("who is not authenticated cannot access an authenticated route", () => {
      cy.visit(authenticatedRoute);
      cy.validatePathname("/");
    });

    it("who is an employee can access an authenticated route", () => {
      cy.loginEmployee();
      cy.visit(authenticatedRoute);
      cy.validatePathname(authenticatedRoute);
    });
  });

  context("navbar", () => {
    beforeEach(() => {
      cy.loginEmployee();
    });

    it("renders when page loads.", () => {
      cy.visit(authenticatedRoute);
      cy.getByTestId("navbar");
    });

    it("navigates to home page when title clicked", () => {
      cy.visit(authenticatedRoute);
      cy.getByTestId("navbar-title").click();
    });

    it("has links only accessible to employees when employee logged in.", () => {
      cy.visit(authenticatedRoute);

      cy.getByTestId("navbar-title").click();
      cy.validatePathname("/tasklist");

      cy.getByTestId("navbar-task-list-link").click();
      cy.validatePathname("/tasklist");

      cy.getByTestId("navbar-task-list-link").click();
      cy.validatePathname("/tasklist");

      cy.getByTestId("navbar-jobs-link").click();
      cy.validatePathname("/jobs");

      cy.getByTestId("navbar-machines-link").click();
      cy.validatePathname("/machines");
    });

    it("logs out when logout button clicked.", () => {
      cy.visit(authenticatedRoute);

      cy.getByTestId("navbar-user-dropdown").click();
      cy.getByTestId("navbar-user-dropdown-logout-button").click();
      cy.validatePathname("/");
      cy.validateUserCookie(false);
    });
  });

  context("footer", () => {
    it("renders when page loads.", () => {
      cy.loginEmployee();
      cy.visit(authenticatedRoute);

      cy.getByTestId("footer");
      cy.getByTestId("footer-copyright");
    });
  });
});

export {};
