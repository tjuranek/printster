/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit('/jobs/1');
});

describe('Job page', () => {
  context('access', () => {
    it('is available to employees.', () => {
      cy.validatePathname('/jobs/1');
    });
  });

  context('jobs information card', () => {
    it('shows correct job information in row', () => {
      const card = cy.getByTestId('job-1-info');

      [
        'To Kill a Mocking Bird',
        'Harper Lee',
        'J. B. Lippincott & Co',
        'Complete',
        '1/1/2022',
        '1/31/2022'
      ].forEach((value) => {
        card.should('contain.text', value);
      });
    });
  });
});

export {};
