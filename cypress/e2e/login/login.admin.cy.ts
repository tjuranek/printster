/// <reference types="cypress" />

const admin = {
  username: "amyfinch",
  password: "admin",
};

before(() => {
  cy.resetDb();
});

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("cookie", () => {
    it("should be set after an admin logs in.", () => {
      cy.loginAdmin();
      cy.validateUserCookie(true);
    });
  });

  context("form", () => {
    it("successfully logs in with admin credentials.", () => {
      cy.getByTestId("login-form-username").type(admin.username);
      cy.getByTestId("login-form-password").type(admin.password);
      cy.getByTestId("login-form-submit").click();

      cy.validatePathname("/dashboard");
    });
  });
});

export {};
