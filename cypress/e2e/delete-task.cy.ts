/// <reference types="cypress" />

describe("Edit Task", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);

    cy.visit("http://localhost:5173");
    cy.wait(3000);

    cy.get("body").should("exist");
  });
});
