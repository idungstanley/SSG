/// <reference types="cypress"/>
export default class Login {
  navigate() {
    return cy.visit('http://localhost:3001');
  }

  signin_email(email) {
    cy.get('#email').clear();
    cy.get('#email').type(email);
    return this;
  }

  signin_password(password) {
    cy.get('#password').clear();
    cy.get('#password').type(password);
    return this;
  }

  click_signin() {
    return cy.get("button[type='submit'").click();
  }
}
