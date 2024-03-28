describe('Navigation Test', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it('Clicks on nav links containing specific text', () => {
        // Get all <a> elements with class 'nav-link' within <div id="navbarExample">
        cy.get('div#navbarExample').find('a.nav-link').each(($link) => {
            // Extract the text of the link
            const linkText = $link.text().trim();
            
            // Check if the link text contains the word 'contain'
            if (linkText.includes('Contact')) {
                // If the link text contains 'contain', click on the link
                cy.wrap($link).click();
            }
        });
    });
});