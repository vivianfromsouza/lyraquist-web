describe("User login/Signup flow", () => {
  it("should signup a new User", () => {
    cy.visit("https://127.0.0.1:5173/");
    cy.contains('[aria-label="title"]', "LYRAQUIST").should("be.visible");
    cy.get("[aria-label='signupClick']").click();
  });

  it("should login an existing User", () => {
    cy.visit("https://127.0.0.1:5173/");
    cy.contains('[aria-label="title"]', "LYRAQUIST").should("be.visible");
    cy.get("[aria-label='loginClick']").click();
    cy.get("[aria-label='username']").click().type("viviand@email.sc.edu");
    cy.get("[aria-label='password']").click().type("1234567");
    cy.get("[data-testid='login-button']").click();
    cy.wait(3000);
  });
});
