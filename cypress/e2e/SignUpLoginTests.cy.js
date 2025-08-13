describe("User login/Signup flow", () => {
  // it("should signup a new User - User already exists", () => {
  //   cy.visit("https://127.0.0.1:5173/");
  //   cy.contains('[aria-label="title"]', "LYRAQUIST").should("be.visible");
  //   cy.get("[aria-label='signupClick']").click();
  //   cy.get("[aria-label='nameInput']").click().type("Venus Verena");
  //   cy.get("[aria-label='emailInput']").click().type("vv@email.sc.edu");
  //   cy.get("[aria-label='confirmEmailInput']").click().type("vv@email.sc.edu");
  //   cy.get("[aria-label='passInput']").click().type("123456");
  //   cy.get("[aria-label='confirmPassInput']").click().type("123456");
  //   cy.get("[aria-label='Select a language']").click();
  //   cy.get("[aria-label='English']").click();
  //   cy.get("[aria-label='English']").click();
  //   cy.get("[aria-label='signupCheckbox']").click();
  //   cy.get("[data-testid='signupButton']").click();
  // });

  it("should login an existing User and connect to Spotify", () => {
    cy.visit("https://127.0.0.1:5173/");
    cy.contains('[aria-label="title"]', "LYRAQUIST").should("be.visible");
    cy.get("[aria-label='loginClick']").click();
    cy.get("[aria-label='username']").click().type("viviand@email.sc.edu");
    cy.get("[aria-label='password']").click().type("1234567");
    cy.get("[data-testid='login-button']").click();
    cy.wait(2000);

    cy.origin("https://accounts.spotify.com", () => {
      cy.contains(
        '[data-testid="login-container"]',
        "Log in to Spotify"
      ).should("be.visible");
      cy.get("[data-testid='login-username']")
        .click()
        .type("vivian.dsouza.789@gmail.com");
      cy.get("[data-encore-id='buttonPrimary']").click();
    });

    cy.origin("https://challenge.spotify.com", () => {
      cy.wait(5000);
      cy.contains('Log in with a password').click();
      cy.wait(5000);
    });

     cy.origin("https://accounts.spotify.com", () => {
      cy.get("[data-testid='login-password']")
        .click()
        .type("cookiejarTVTV1");
      cy.get("[data-encore-id='buttonPrimary']").click();
    });
  });
});
