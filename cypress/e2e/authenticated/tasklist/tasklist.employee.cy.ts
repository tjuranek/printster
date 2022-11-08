/// <reference types="cypress" />

before(() => {
  cy.resetDb();
});

beforeEach(() => {
  cy.loginEmployee();
  cy.visit("/tasklist");
});

describe("Task List page", () => {
  context("access", () => {
    it("is avaible to employees.", () => {
      cy.validatePathname("/tasklist");
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
    it("does not render when employee visits the page.", () => {
      cy.getByTestId("employee-select").should("not.exist");
    });
  });

  context("welcome message", () => {
    it("displays the correct employee information.", () => {
      cy.getByTestId("welcome-message");
      cy.getByTestId("welcome-message-name").should("have.text", "Ryan");
      cy.getByTestId("welcome-message-task-count").should("have.text", "2");
    });
  });

  context("task list", () => {
    it("renders items on page load.", () => {
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
