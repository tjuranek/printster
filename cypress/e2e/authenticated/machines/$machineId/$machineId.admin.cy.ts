/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/machines/1');
});

describe('Machine page', () => {
  context('access', () => {
    it('should be available to admins.', () => {
      cy.validatePathname('/machines/1');
    });
  });

  context('modal', () => {
    it('navigates to a employee page when employee link clicked', () => {
      cy.getByTestId('machine-1-modal-job-table-row-1-employee-link').click();
      cy.validatePathname('/employees/2');
    });
  });
});

export {};
