/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit('/dashboard');
});

describe('Dashboard page', () => {
  context('access', () => {
    it('is available to admin.', () => {
      cy.validatePathname('/dashboard');
    });
  });

  context('breadcrumbs', () => {
    it('render on page load.', () => {
      cy.getByTestId('breadcrumbs');
      cy.getByTestId('breadcrumbs-link-Home');
      cy.getByTestId('breadcrumbs-link-Dashboard');
    });
  });

  context('users card', () => {
    it('displays users data.', () => {
      const lastHiredEmployeeId = 4;

      cy.getByTestId('users-card');
      cy.getByTestId('users-card-admins-value').should('contain.text', 1);
      cy.getByTestId('users-card-employees-value').should('contain.text', 3);
      cy.getByTestId(`users-card-last-hired-employee-${lastHiredEmployeeId}`);
    });
  });

  context('recent jobs card', () => {
    it('displays three most recent jobs.', () => {
      cy.getByTestId('recent-jobs-card');
      cy.getByTestId('recent-jobs-card-list-item-13');
      cy.getByTestId('recent-jobs-card-list-item-12');
      cy.getByTestId('recent-jobs-card-list-item-11');
    });

    it('navigates to a job when job button clicked.', () => {
      cy.getByTestId('recent-jobs-card-list-item-11-button').click();
      cy.validatePathname('/jobs/11');
    });
  });

  context('machines card', () => {
    it('displays machine data.', () => {
      cy.getByTestId('machines-card');
      cy.getByTestId('machines-card-total').should('contain.text', 6);
      cy.getByTestId('machines-card-printers').should('contain.text', 2);
      cy.getByTestId('machines-card-binders').should('contain.text', 2);
      cy.getByTestId('machines-card-coverers').should('contain.text', 2);
    });
  });
});

export {};
