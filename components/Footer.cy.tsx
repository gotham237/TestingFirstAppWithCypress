import Footer from './Footer'

describe('Footer', () => {
  it("user can subscribe to the newsletter", () => {
    cy.mount(<Footer/>)
    cy.get("#email-address").should("have.attr", "placeholder", "Enter your email").type("gotham@test.com")
    cy.get("button").should("contain", "Subscribe")
  })
})