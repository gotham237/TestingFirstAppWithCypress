beforeEach(() => {
  cy.log("I run before every spec file")
})

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`)
})
