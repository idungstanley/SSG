/// <reference types="cypress"/>
export default class Tasks {
  click_tasks_app() {
    return cy.get('#TASKS').click();
  }
  click_on_hub() {
    return cy.get(':nth-child(1) > .flex-col > .bg-white > .justify-between').click();
  }
}
