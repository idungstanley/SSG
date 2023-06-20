/// <reference types="cypress"/>
import { testData } from '../fixtures/testData';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('password has a class called red', () => {
    cy.get('#email').clear();
    cy.get('#email').type(testData.email);
    cy.get('#password').should('have.css', 'red')
    cy.get('#password').type(testData.password);
    cy.get("button[type='submit'").click()
  });
  it('Login Successfully', () => {
    cy.get('#email').clear();
    cy.get('#email').type(testData.email);
    cy.get('#password').type(testData.password);
    cy.get("button[type='submit'").click();
    cy.wait(1000);
    cy.get('#TASKS > .relative').click()
    cy.wait(3000);
    cy.get(':nth-child(1) > :nth-child(1) > .truncate.hover:bg-gray-100 > .justify-between').click();
    cy.wait(3000);
    cy.get('.fixed > :nth-child(2) > .flex').click()
  });
});
