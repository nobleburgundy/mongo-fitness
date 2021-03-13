before(() => {
  cy.visit("/");
});

describe("Home page", () => {
  it("Mongo Fitness Home Page Loads", () => {
    cy.get("h1").should("be.visible").and("contain", "Fitness Tracker");
    cy.contains("Continue Workout").should("be.visible");
    cy.contains("New Workout").should("be.visible");
    cy.get("a").contains("Dashboard").should("be.visible");
    cy.get("a").contains("Fitness Tracker").should("be.visible");
  });

  //   it("New and Continue Workout buttons load", () => {
  //   });
});
