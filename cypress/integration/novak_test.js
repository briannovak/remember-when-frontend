describe("TowerTest1", function () {
  it(".should() have a logo that displays", function () {
	  cy.visit("http://127.0.0.1:8080");
	  cy.get("img").should("have.attr", "src", "/static/img/rememberwhenlogo.d8206e1.png");
  });
  it(".should() - have navigation links", function () {
	  cy.visit("http://127.0.0.1:8080");
	  cy.get("body > div > nav > div > ul > li").as("listitems");
	  cy.get("@listitems").eq(0).find("a").should("have.text", "Remember!");
	  cy.get("@listitems").eq(1).find("a").should("have.text", "Friends");
	  cy.get("@listitems").eq(2).find("a").should("have.text", "Events");
	  cy.get("@listitems").eq(3).find("a").should("have.text", "About");
  });
  it(".should() - have a list of 1 or more friends", function () {
	  cy.visit("http://127.0.0.1:8080/#/friends");
	  cy.get("tr").should("have.length.gte", 1);
  });
  it(".should() - go to /add-friend when Add Friend Button is clicked", function () {
	  cy.visit("http://127.0.0.1:8080/#/friends");
	  cy.get("a").contains("Add Friend").click();
	  cy.url().should("be", "/#/add-friend");
  });
  it(".should() - Add a Friend", function () {
	  cy.visit("http://127.0.0.1:8080/#/friends");
	  cy.get("a").contains("Add Friend").click();
	  cy.url().should("be", "/#/add-friend");
		cy.get("input").type("Kyle Coberly");
		cy.get("button").contains("Add Friend").click();
		cy.get("a").contains("Friend List").click();
  });
  it(".should() - Remove a Friend", function () {
	  cy.visit("http://127.0.0.1:8080/#/friends");
	  cy.get("a").contains("Remove Friend").click();
	  cy.url().should("be", "/#/remove-friend");
		cy.get("select").select("Kyle Coberly");
		cy.get("button").contains("Remove Friend").click();
		cy.get("a").contains("Friend List").click();
  });
});
