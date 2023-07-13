describe("User Journey", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("a user can find a course on the home page and complete the courses lessons", () => {
    cy.getByData("course-0").find("a").contains("Get started").click()
    cy.location("pathname").should("equal", "/testing-your-first-application")
    cy.getByData("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/app-install-and-overview"
    )
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").should("exist").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").click()
    cy.location("pathname").should(
      "eq",
      "/testing-your-first-application/setting-up-data-before-each-test"
    )
    cy.getByData("challenge-answer-0").click()
    cy.getByData("next-lesson-button").click()
    cy.location("pathname").should("eq", "/")
  })

  it("User subscribes to the newsletter and finishes app-install-and-overview 1 part", () => {
    cy.get('[data-test="email-input"]').type("gotham@test.com")
    cy.get('[data-test="submit-button"]').click()
    cy.get('[data-test="success-message"]')
      .should("exist")
      .contains("Success: gotham@test.com has been successfully subscribed")
    cy.get('[data-test="course-0"]').find("a").contains("Get started").click()
    cy.location("pathname").should("eq", "/testing-your-first-application")
    cy.get('[data-test="next-lesson-button"]').click()
    cy.location("pathname").should("eq", "/testing-your-first-application/app-install-and-overview")

  })
})
