describe("Search Filters - Integration Tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);

    cy.visit("http://localhost:5173");
    cy.wait(3000);

    cy.get("body").should("exist");
  });

  it("should show appropriate UI feedback", () => {
    cy.get('[data-testid="task-card"]').should("exist");

    cy.get('[data-testid="search-input"]').clear().type("status:BACKLOG");
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="search-input"]')
      .clear()
      .type("status:IN_PROGRESS tags:REACT");
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="clear-button"]').click();

    cy.get('[data-testid="search-input"]').clear().type("Ticket");
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="task-card"]').should("exist");
  });

  it("should update UI when filters are applied", () => {
    const initialTaskCount = cy.get('[data-testid="task-card"]').its("length");

    cy.get('[data-testid="search-input"]').clear().type("status:BACKLOG");
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="task-card"]').should(($cards) => {
      expect($cards.length).not.to.equal(initialTaskCount);
    });

    cy.get('[data-testid="search-input"]').should(
      "have.value",
      "status:BACKLOG"
    );

    cy.get('[data-testid="clear-button"]').should("be.visible");
  });
});
