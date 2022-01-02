describe("Redirect", () => {
	it("should redirect if not authorized", () => {
        cy.visit("http://localhost:3000/");
        cy.url().should("include", "register")
        
        cy.visit("http://localhost:3000/dawda");
        cy.url().should("include", "register")
    });
});
