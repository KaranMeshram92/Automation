import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
describe('Demo Blaze Test spec', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it('passes', () => {

        demoblazeHomeScreen.verifyHomeTitle();

        demoblazeHomeScreen.verifyHomeLogo();

        // Define the expected text values for the <li> items
        const expectedTextValues = ['Home', 'Contact', 'About us', 'Cart', 'Log in', 'Sign up'];

        // Assert the count of <li> items within <ul class="nav-items">
        cy.get('div#navbarExample').find('a.nav-link').not('[style="display:none"]').should('have.length', expectedTextValues.length);

        // Iterate through each visible <a> element and compare its text content with expected values
        cy.get('div#navbarExample').find('a.nav-link').not('[style="display:none"]').each(($a, index) => {
            cy.wrap($a).invoke('text').then((text) => {
                expect(text.trim()).to.contain(expectedTextValues[index]);
            });
        });

        demoblazeHomeScreen.verifyHomeNavLinks(expectedTextValues);

        // Assert that the <div class="carousel"> contains exactly 3 <div> items
        cy.get('div.carousel-inner').find('div').should('have.length', 3);

        // Assert that the <a id="cat"> element has 3 sub-child <a id="itemc"> elements
        cy.get('a#itemc').should('have.length', 3);

        // Define the expected texts for the sub-child <a> elements
        const expectedItemTexts = ['Phones', 'Laptops', 'Monitors'];

        // Iterate through each sub-child <a> element and assert its text content
        cy.get('a#itemc').each(($itemc, index) => {
            cy.wrap($itemc).invoke('text').then((text) => {
                expect(text.trim()).to.equal(expectedItemTexts[index]);
            });
        });

        // Assert that the <footer class="py-5"> contains a <p> tag with the text "Copyright © Product Store 2017"
        cy.get('.m-0').should('contain.text', 'Copyright © Product Store 2017');

        // Fotter should be visible
        cy.get('#footc').should('be.visible');

        // Define the expected texts array
        const expectedTexts = [
            'We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.',
            'Address: 2390 El Camino Real',
            'Phone: +440 123456',
            'Email: demo@blazemeter.com'
        ];

        // Assert that the <div class="footc"> contains a <div class="caption"> with 4 <p> elements
        cy.get('#footc').find('div.caption')
            .find('p').should('have.length', 4)
            .each(($p, index) => {
                // Get the text content of the <p> element and replace newline characters with spaces
                const actualText = $p.text().replace(/\n/g, ' ');

                // Normalize whitespace in actual and expected text
                const actualNormalized = actualText.replace(/\s+/g, ' ').trim();
                const expectedNormalized = expectedTexts[index].replace(/\s+/g, ' ').trim();

                // Assert the modified text content matches the expected text
                expect(actualNormalized).to.equal(expectedNormalized);

                // Log the modified text content
                cy.log(actualText);
            });

    })
})