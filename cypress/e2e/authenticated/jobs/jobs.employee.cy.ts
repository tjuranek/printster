/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit('/jobs');
});

describe('Jobs page', () => {
  context('access', () => {
    it('is available to employees.', () => {
      cy.validatePathname('/jobs');
    });
  });

  context('breadcrumbs', () => {
    it('render on page load.', () => {
      cy.getByTestId('breadcrumbs');
      cy.getByTestId('breadcrumbs-link-Home');
      cy.getByTestId('breadcrumbs-link-Jobs');
    });
  });

  context('jobs table', () => {
    it('shows correct job information in row', () => {
      cy.getByTestId('jobs-table');

      const row = cy.getByTestId('jobs-table-row-1');

      [
        'To Kill a Mocking Bird',
        'Harper Lee',
        'J. B. Lippincott & Co',
        'Complete'
      ].forEach((value) => {
        row.should('contain.text', value);
      });
    });

    it('navigates to job page when details button clicked', () => {
      cy.getByTestId('jobs-table-row-1-button').click();
      cy.validatePathname('/jobs/1');
    });
  });
});

export {};
