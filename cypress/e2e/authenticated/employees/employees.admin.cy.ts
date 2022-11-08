/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/employees');
});

describe('Employees page', () => {
  context('access', () => {
    it('is available for admins.', () => {
      cy.validatePathname('/employees');
    });
  });

  context('breadcrumbs', () => {
    it('render on page load.', () => {
      cy.getByTestId('breadcrumbs');
      cy.getByTestId('breadcrumbs-link-Home');
      cy.getByTestId('breadcrumbs-link-Employees');
    });
  });

  context('employees list', () => {
    it('renders on page load.', () => {
      cy.getByTestId('employees-list');
      cy.getByTestId('employee-list-item-Amy Finch');
      cy.getByTestId('employee-list-item-Ryan Johnson');
      cy.getByTestId('employee-list-item-Grace Potter');
      cy.getByTestId('employee-list-item-Tony Boulder');
    });

    it('routes to individual employee page when item clicked.', () => {
      cy.getByTestId('employee-list-item-Amy Finch').click();
      cy.validatePathname('/employees/1');
    });
  });

  context('selected employee', () => {
    it('empty state is rendered.', () => {
      cy.getByTestId('employee-selection-empty-state');
    });
  });
});

export {};
