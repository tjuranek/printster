/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit('/machines/1');
});

describe('Machine page', () => {
  context('access', () => {
    it('should be available to employees.', () => {
      cy.validatePathname('/machines/1');
    });
  });

  context('modal', () => {
    it('renders machine data on render.', () => {
      const modal = cy.getByTestId('machine-1-modal');

      ['Digiy', 'Printer', 'Morgana', 'DigiBook 200'].forEach((value) => {
        modal.should('contain.text', value);
      });
    });

    it('renders job data in table.', () => {
      cy.getByTestId('machine-1-modal-job-table');

      const tableRow = cy.getByTestId('machine-1-modal-job-table-row-1');

      ['To Kill a Mocking Bird', 'Ryan Johnson', '1/1/2022'].forEach(
        (value) => {
          tableRow.should('contain.text', value);
        }
      );
    });

    it('navigates to a job page when job link clicked', () => {
      cy.getByTestId('machine-1-modal-job-table-row-1-job-link').click();
      cy.validatePathname('/jobs/1');
    });
  });
});

export {};
