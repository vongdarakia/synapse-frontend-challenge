/// <reference types="Cypress" />

import FakeAPI from "../../../src/api/fake-api";

context("Signing up for Dave", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        // Need to figure out how to do this part better
        // Probably do a sign up beforehand to make sure the log in is valid
        FakeAPI.saveUser(
            "akia-test@synapse.com",
            "Test1234*",
            "5d13ece050fefc52842524d0"
        );
    });

    it("should login with valid email and password", () => {
        cy.get("#btn-login").click();

        cy.get("#input-email")
            .type("akia-test@synapse.com")
            .should("have.value", "akia-test@synapse.com");

        cy.get("#input-password")
            .type("Test1234*")
            .should("have.value", "Test1234*");

        cy.get("#btn-login").click();
    });
});
