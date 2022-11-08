/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/jobs/1');
});

describe('Job page', () => {
  context('access', () => {
    it('is available to admins.', () => {
      cy.validatePathname('/jobs/1');
    });
  });

  context('jobs tasks card', () => {
    it('shows correct task information.', () => {
      cy.getByTestId('job-1-tasks');

      const print = cy.getByTestId('job-1-tasks-step-1');
      ['Digiy', 'Ryan Johnson'].forEach((value) => {
        print.should('contain.text', value);
      });

      const bind = cy.getByTestId('job-1-tasks-step-2');
      ['Atlast', 'Grace Potter'].forEach((value) => {
        bind.should('contain.text', value);
      });

      const cover = cy.getByTestId('job-1-tasks-step-3');
      ['Curby', 'Tony Boulder'].forEach((value) => {
        cover.should('contain.text', value);
      });
    });

    it('can change selected machine', () => {
      cy.getByTestId('job-1-tasks-step-1-machine-select').select('Docy');
      cy.getByTestId('job-1-tasks-step-1-machine-select').should(
        'have.value',
        2
      );
    });

    it('can change selected employee.', () => {
      cy.getByTestId('job-1-tasks-step-1-employee-select').select(
        'Grace Potter'
      );
      cy.getByTestId('job-1-tasks-step-1-employee-select').should(
        'have.value',
        3
      );
    });
  });
});

export {};
