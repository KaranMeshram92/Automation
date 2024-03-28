export default class DemoblazeHomeScreen {
    constructor() {
        this.url = 'https://www.demoblaze.com/index.html';
        this.title = 'STORE';
        this.homeLogo = 'a#nava';
        //this.navMainBar = 'div#navbarExample';
        this.navLinks = 'a.nav-link';

    }

    verifyHomeTitle() {
        cy.title().should('eq', this.title);
    }

    verifyHomeLogo() {
        cy.get(this.homeLogo).should('be.visible');
    }

    verifyHomeNavLinks(expectedTextValues) {
        // Assert the count of <a> items within <div id="navbarExample" class="navbar-collapse collapse">
        cy.get(this.navLinks).not('[style="display:none"]').should('have.length', expectedTextValues.length);

        // Iterate through each visible <a> element and compare its text content with expected values
        cy.get(this.navLinks).not('[style="display:none"]').each(($a, index) => {
            cy.wrap($a).invoke('text').then((text) => {
                expect(text.trim()).to.contain(expectedTextValues[index]);
            });
        });
    }
}