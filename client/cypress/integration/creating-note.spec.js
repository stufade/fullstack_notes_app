describe("creating note", () => {
	it("user can create note", () => {
		cy.visit("http://localhost:3000/");
		cy.url().should("include", "/register");

		cy.get("a").click();
		cy.url().should("include", "/login");

		cy.fixture("info").then((info) => {
			const { title, content, password, name } = info;

			cy.get('[name="name"]').type(name);
			cy.get('[name="password"]').type(password);

			cy.findByRole("button", { name: /submit/i }).click();
			cy.findByRole("heading", {
				name: name,
			}).should("exist");

			cy.findByRole("button", {
				name: /plus add note/i,
			}).click();

			cy.wait(500);

			cy.get(".flex-wrap div:last-child div:last-child").click();
			cy.get(":nth-child(1) > .w-full").clear().type(title);
			cy.get(":nth-child(2) > .w-full").clear().type(content);
			cy.findByRole("button", {
				name: /save/i,
			}).click();

			cy.wait(500);

			cy.get(".flex-wrap div:last-child div:last-child").then((div) => {
				const text = div.text();

				expect(content).to.contain(text.slice(0, -3));
			});

			cy.get(".flex-wrap div:last-child div:first-child div").then(
				(div) => {
					const text = div.text();

					expect(title).to.equal(text);
				}
			);

			cy.get(".flex-wrap div:last-child div:first-child button").click();
			cy.wait(500);

            cy.get(".flex-wrap div:last-child div:first-child div").should("not.exist")
		});
	});
});
