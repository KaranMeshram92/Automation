describe('Demo Blaze Test spec', () => {

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it('passes', () => {
        
        cy.title().should('eq', 'STORE');
    })
})