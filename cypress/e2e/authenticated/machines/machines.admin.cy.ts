/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/machines');
});

describe('Machines page', () => {
  context('access', () => {
    it('should be available to admins.', () => {
      cy.validatePathname('/machines');
    });
  });
});

export {};
