/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/employees/2');
});

describe('Employee page', () => {
  context('access', () => {
    it('is available for admins.', () => {
      cy.validatePathname('/employees/2');
    });
  });

  context('employee selection', () => {
    it('renders on page load.', () => {
      cy.getByTestId('employee-selection-2').should(
        'contain.text',
        'Ryan Johnson'
      );

      cy.getByTestId('employee-selection-2-completed-task-count').should(
        'contain.text',
        11
      );
      cy.getByTestId('employee-selection-2-active-task-count').should(
        'contain.text',
        2
      );
    });

    it('deactivates and reactivates employee when activation button clicked', () => {
      cy.getByTestId('employee-selection-2-activation-button').should(
        'have.text',
        'Deactivate'
      );

      cy.getByTestId('employee-selection-2-activation-button').click();

      cy.getByTestId('employee-selection-2-activation-button').should(
        'have.text',
        'Reactivate'
      );

      cy.getByTestId('employee-selection-2-activation-button').click();

      cy.getByTestId('employee-selection-2-activation-button').should(
        'have.text',
        'Deactivate'
      );
    });
  });
});

export {};
