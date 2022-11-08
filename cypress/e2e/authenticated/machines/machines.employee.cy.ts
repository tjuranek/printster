/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit('/machines');
});

describe('Machines page', () => {
  context('access', () => {
    it('should be available to employees.', () => {
      cy.validatePathname('/machines');
    });
  });

  context('breadcrumbs', () => {
    it('render on page load.', () => {
      cy.getByTestId('breadcrumbs');
      cy.getByTestId('breadcrumbs-link-Home');
      cy.getByTestId('breadcrumbs-link-Machines');
    });
  });

  context('machine cards', () => {
    it('render all available machines.', () => {
      cy.getByTestId('machine-cards');
      cy.getByTestId('machine-card-1');
      cy.getByTestId('machine-card-2');
      cy.getByTestId('machine-card-3');
      cy.getByTestId('machine-card-4');
      cy.getByTestId('machine-card-5');
      cy.getByTestId('machine-card-6');
    });

    it('displays expected information on card.', () => {
      const card = cy.getByTestId('machine-card-1');

      ['Digiy', 'Printer', 'Morgana', 'DigiBook 200'].forEach((value) => {
        card.should('contain.text', value);
      });
    });

    it('navigate to machine page when view jobs button clicked.', () => {
      cy.getByTestId('machine-card-1-jobs-button').click();
      cy.validatePathname('/machines/1');
    });
  });
});

export {};
