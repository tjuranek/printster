/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit('/employees/2');
});

describe('Employee page', () => {
  context('access', () => {
    it('is not available for employees.', () => {
      cy.validatePathname('/unauthorized');
    });
  });
});

export {};
