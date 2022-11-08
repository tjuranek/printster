/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginAdmin();
  cy.visit("/tasklist/1");
});

describe("Task List page", () => {
  context("access", () => {
    it("is avaible to admins.", () => {
      cy.validatePathname("/tasklist/1");
    });
  });

  context("breadcrumbs", () => {
    it("render on page load.", () => {
      cy.getByTestId("breadcrumbs");
      cy.getByTestId("breadcrumbs-link-Home");
      cy.getByTestId("breadcrumbs-link-Task List");
    });
  });

  context("employee select", () => {
    it("renders when an admin views the page.", () => {
      cy.getByTestId("employee-select");
    });

    it("navigates to employee task list when new employee selected.", () => {
      cy.getByTestId("employee-select").select("Ryan Johnson");
    });
  });

  context("welcome message", () => {
    it("displays the correct employee information.", () => {
      cy.getByTestId("welcome-message");
      cy.getByTestId("welcome-message-name").should("have.text", "Amy");
      cy.getByTestId("welcome-message-task-count").should("have.text", "0");
    });
  });

  context("task list", () => {
    beforeEach(() => {
      cy.getByTestId("employee-select").select("Ryan Johnson");
    });

    it("renders on page load.", () => {
      cy.getByTestId("task-list");
      cy.getByTestId("task-list-item-34");
      cy.getByTestId("task-list-item-37");
    });

    it("displays the correct information on list items.", () => {
      cy.getByTestId("task-list-item-34-header").should(
        "have.text",
        "Atomic Habits"
      );
      cy.getByTestId("task-list-item-34-step").should("have.text", "Print");
      cy.getByTestId("task-list-item-34-machine").should("have.text", "Docy");
      cy.getByTestId("task-list-item-34-status-select").should("have.value", 1);
    });

    it("navigates to machine for task when clicked", () => {
      cy.getByTestId("task-list-item-34-machine").click();
      cy.validatePathname("/machines/2");
    });

    it("changes status when a new status is selected", () => {
      cy.getByTestId("task-list-item-34-status-select").select("In Progress");
      cy.getByTestId("task-list-item-34-status-select").should("have.value", 2);
    });
  });
});

export {};
