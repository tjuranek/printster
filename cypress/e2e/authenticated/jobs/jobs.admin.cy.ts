/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/jobs');
});

describe('Jobs page', () => {
  context('access', () => {
    it('is available to admins.', () => {
      cy.validatePathname('/jobs');
    });
  });
});

export {};
