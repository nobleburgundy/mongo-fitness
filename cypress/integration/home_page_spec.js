before(() => {
  cy.visit("/");
});

describe("Home page", () => {
  it("Mongo Fitness Header Loads", () => {
    cy.get("h1").should("be.visible").and("contain", "Fitness Tracker");
  });

  it("New and Continue Workout buttons load", () => {
    cy.contains("Continue Workout").should("be.visible");
    cy.contains("New Workout").should("be.visible");
  });
});
