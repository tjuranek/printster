/// <reference types="cypress" />

const employee = {
  username: "ryanjohnson",
  password: "employee",
};

before(() => {
  cy.resetDb();
});

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("cookie", () => {
    it("should not be set by default.", () => {
      cy.validateUserCookie(false);
    });

    it("should be set after an employee logs in.", () => {
      cy.loginEmployee();
      cy.validateUserCookie(true);
    });
  });

  context("form", () => {
    it("renders when the page loads.", () => {
      cy.getByTestId("login-form");
    });

    it("shows error state when no data is submitted.", () => {
      cy.getByTestId("login-form-submit").click();

      cy.getByTestId("login-form-error");
      cy.getByTestId("login-form-username").should("have.class", "input-error");
      cy.getByTestId("login-form-password").should("have.class", "input-error");
    });

    it("shows error state when username ommitted.", () => {
      cy.getByTestId("login-form-password").type(employee.password);
      cy.getByTestId("login-form-submit").click();

      cy.getByTestId("login-form-error");
      cy.getByTestId("login-form-username").should("have.class", "input-error");
      cy.getByTestId("login-form-password").should("have.class", "input-error");
    });

    it("shows error state when password ommitted", () => {
      cy.getByTestId("login-form-username").type(employee.username);
      cy.getByTestId("login-form-submit").click();

      cy.getByTestId("login-form-error");
      cy.getByTestId("login-form-username").should("have.class", "input-error");
      cy.getByTestId("login-form-password").should("have.class", "input-error");
    });

    it("successfully logs in with employee credentials.", () => {
      cy.getByTestId("login-form-username").type(employee.username);
      cy.getByTestId("login-form-password").type(employee.password);
      cy.getByTestId("login-form-submit").click();

      cy.validatePathname("/tasklist");
    });
  });
});

export {};
