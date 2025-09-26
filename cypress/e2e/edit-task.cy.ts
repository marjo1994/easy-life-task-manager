/// <reference types="cypress" />

describe("Edit Task", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);

    cy.visit("http://localhost:5173");
    cy.wait(3000);

    cy.get("body").should("exist");
  });

  it("should open edit modal correctly", () => {
    cy.get('[data-testid^="task-card"]')
      .first()
      .within(() => {
        cy.get('img[alt="three dots"]').click();
      });

    cy.get('[role="menu"]').should("be.visible");

    cy.get('[role="menu"]').within(() => {
      cy.contains("button", "Edit").should("be.visible");
      cy.contains("button", "Delete").should("be.visible");
    });

    cy.get('[role="menu"]').contains("button", "Edit").click();

    cy.get('[data-testid="task-modal"]').should("be.visible");
  });

  it("should close menu when clicking outside", () => {
    cy.get('[data-testid^="task-card"]')
      .first()
      .within(() => {
        cy.get('img[alt="three dots"]').click();
      });

    cy.get("body").click(10, 10);

    cy.get('[role="menu"]').should("not.exist");
  });

  it("should edit task successfully", () => {
    cy.get('[data-testid^="task-card"]')
      .first()
      .within(() => {
        cy.get('img[alt="three dots"]').click();
      });

    cy.get('[role="menu"]').contains("button", "Edit").click();

    cy.get('input[placeholder="Task Title"]')
      .clear()
      .type("Updated Task Title");

    cy.get('[data-testid="task-modal"]').within(() => {
      cy.get("button").eq(2).click();
    });
    cy.contains("8 Points").click();

    cy.get('[data-testid="task-modal"]').within(() => {
      cy.get("button").eq(3).click();
    });
    cy.get('[role="option"]').eq(2).click();

    cy.get('[data-testid="task-modal"]').within(() => {
      cy.get("button").eq(4).click();
    });
    cy.get('input[type="checkbox"]').eq(2).click();
    cy.get("body").type("{esc}");

    cy.get('input[placeholder="Due Date"]').click();
    cy.get(".react-datepicker__day--today").click();

    cy.get('button[type="submit"]').filter(":visible").click();
    cy.contains("¡Task updated successfully!").should("be.visible");
  });
});
