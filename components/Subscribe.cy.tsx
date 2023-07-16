import Subscribe from './Subscribe'

describe('Subscribe component', () => {
  it('contains the correct placeholder text', ()=>{
    cy.mount(<Subscribe/>)
    cy.get("input").should("have.attr", "placeholder", "Subscribe for Updates")
  })

  it('allows user to subscribe to the newsletter', () => {
    cy.mount(<Subscribe/>)

    cy.intercept("POST", "/api/subscribe", {
      body: {
        message: "Success: gotham@test.com has been successfully subscribed"
      }
    }).as("emailSubscribe")

    cy.getByData("email-input").type("gotham@test.com")
    cy.getByData("submit-button").click()

    cy.wait("@emailSubscribe")

    cy.getByData("success-message")
      .should("exist")
      .contains("Success: gotham@test.com has been successfully subscribed")
  })

  it('does NOT allow already subscriped email adresses', () => {
    cy.mount(<Subscribe/>)

    cy.intercept("POST", "/api/subscribe", {
      body: {
        message: "Error: gotham@test.com already exists. Please use a different email address."
      }
    }).as("emailSubscribe")

    cy.getByData("email-input").type("gotham@test.com")
    cy.getByData("submit-button").click()

    cy.wait("@emailSubscribe")

    cy.getByData("server-error-message")
      .should("exist")
      .contains("gotham@test.com")
  })
})
