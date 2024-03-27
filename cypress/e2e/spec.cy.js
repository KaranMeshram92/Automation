describe('Demo Blaze Test spec', () => {

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'));
    });

    it('passes', () => {
        // Assert the page title
        cy.title().should('eq', 'STORE');
    })
})