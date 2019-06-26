/// <reference types="Cypress" />

import randomString from "../../../src/utils/random-string";

context("Signing up for Dave", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    it("should sign up with valid info", () => {
        cy.get("#btn-sign-up").click();

        cy.get("#input-first-name")
            .type("User")
            .should("have.value", "User");

        const lastName = randomString(8);

        cy.get("#input-last-name")
            .type(lastName)
            .should("have.value", lastName);

        cy.get("#input-email")
            .type(`user-${lastName}@email.com`)
            .should("have.value", `user-${lastName}@email.com`);

        cy.get("#input-password")
            .type("Test1234*")
            .should("have.value", "Test1234*");

        cy.get("#input-phone")
            .type("5551234567")
            .should("have.value", "(555) 123-4567");
    });
});
