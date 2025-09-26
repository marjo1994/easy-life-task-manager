/// <reference types="cypress" />

describe("AddTaskForm", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);

    cy.visit("http://localhost:5173");
    cy.wait(3000);

    cy.get("body").should("exist");
  });
  it("Create a new task", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();

    cy.get('[data-testid="task-modal"]').should("be.visible");
    cy.get('input[placeholder="Task Title"]').type("Desktop Test Task");

    cy.contains("button", "Estimate").click();
    cy.contains("8 Points").click();

    cy.contains("button", "Assignee").click();
    cy.get('[role="option"]').eq(1).click();

    cy.contains("Label").click();
    cy.get('input[type="checkbox"]').first().click();

    cy.get("body").type("{esc}");
    cy.wait(500);

    cy.get('input[placeholder="Due Date"]').click();
    cy.get(".react-datepicker__day").contains("30").click();

    cy.get('button[type="submit"]').filter(":visible").click();
    cy.contains("¡Task created successfully!").should("be.visible");
  });

  it("should show validation error for empty task title", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.contains("button", "Estimate").click();
    cy.contains("8 Points").click();

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Task is empty").should("be.visible");
  });

  it("should show validation error for task name with 2 characters", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.get('input[placeholder="Task Title"]').type("AB");

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Min 3 characters").should("be.visible");
  });

  it("should show validation error for task name with 21 characters", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.get('input[placeholder="Task Title"]').type("A".repeat(21));

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Max 20 characters").should("be.visible");
  });

  it("should show validation error for missing estimate", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.get('input[placeholder="Task Title"]').type("Test Task");

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Point estimate is required").should("be.visible");
  });

  it("should show validation error for missing assignee", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.get('input[placeholder="Task Title"]').type("Test Task");
    cy.contains("button", "Estimate").click();
    cy.contains("8 Points").click();

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Assignee is required").should("be.visible");
  });

  it("should show validation error for invalid date", () => {
    cy.get("button").find('img[alt="plus-icon"]').parent("button").click();
    cy.get('[data-testid="task-modal"]').should("be.visible");

    cy.get('input[placeholder="Task Title"]').type("Test Task");
    cy.contains("button", "Estimate").click();
    cy.contains("8 Points").click();
    cy.contains("button", "Assignee").click();
    cy.get('[role="option"]').eq(1).click();

    cy.get('input[placeholder="Due Date"]').click();
    cy.get(".react-datepicker__day").contains("15").click();

    cy.get('button[type="submit"]').filter(":visible").click();

    cy.contains("Insert a valid date").should("be.visible");
  });
});
