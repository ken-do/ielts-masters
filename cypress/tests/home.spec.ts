describe('home', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display', () => {
        cy.contains('Next.js').should('exist')
    })
})
