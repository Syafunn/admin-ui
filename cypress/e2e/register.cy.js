describe("User registration", () => {
  it("should allow user to register with valid credentials", () => {
    cy.viewport(550, 750);

    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#name")
      .should("be.visible")
      .should("have.attr", "placeholder", "John Doe")
      .type("akunbaru")
      .should("have.value", "akunbaru");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("emailbaru@example.com")
      .should("have.value", "emailbaru@example.com");

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "●●●●●●●●●●●●●●")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Register").click();

    cy.get("div").contains("Register Berhasil").should("be.visible");
    
    cy.wait(5000);
  });

  it("should not allow user to register with an already used email", () => {
    cy.viewport(550, 750);
    
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#name")
      .should("be.visible")
      .should("have.attr", "placeholder", "John Doe")
      .type("John Doe")
      .should("have.value", "John Doe");

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

    cy.get("button").contains("Register").click();

    cy.get("div").contains("Email sudah pernah digunakan sebelumnya").should("be.visible");
  }); 
});