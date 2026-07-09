describe("User login, interact with Dashboard and Logout", () => {
  it("should allow user to log in, toggle dark mode after a delay, and log out", () => {

    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("hello@example.com")
      .should("have.value", "hello@example.com");

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "●●●●●●●●●●●●●●")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Login").click();

    cy.url().should("eq", "http://localhost:5173/");
    cy.get("nav").should("be.visible");    
    cy.get("header").should("be.visible");

    cy.wait(2000);

    cy.get('[data-testid="DarkModeOutlinedIcon"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="LightModeOutlinedIcon"]').should("be.visible");
    cy.get('.dark').should('exist');

    cy.wait(1500);

    cy.contains("Logout")
      .should("be.visible")
      .click();

    cy.url().should("include", "/login");
  });
});