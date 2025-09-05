describe("Home view", () => {
  it("should signup a new User - User already exists", () => {
    cy.visit("https://127.0.0.1:5173/home");
    cy.contains('[aria-label="title"]', "Hello").should("be.visible");
    // cy.get("[aria-label='signupClick']").click();
    // cy.get("[aria-label='nameInput']").click().type("Venus Verena");
    // cy.get("[aria-label='emailInput']").click().type("vv@email.sc.edu");
    // cy.get("[aria-label='confirmEmailInput']").click().type("vv@email.sc.edu");
    // cy.get("[aria-label='passInput']").click().type("123456");
    // cy.get("[aria-label='confirmPassInput']").click().type("123456");
    // cy.get("[aria-label='Select a language']").click();
    // cy.get("[aria-label='English']").click();
    // cy.get("[aria-label='English']").click();
    // cy.get("[aria-label='signupCheckbox']").click();
    // cy.get("[data-testid='signupButton']").click();
  });

});
