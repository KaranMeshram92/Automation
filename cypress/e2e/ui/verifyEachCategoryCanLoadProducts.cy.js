import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";

describe('Demo Blaze Categories can load Products Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    // Define an array of categories to test
    const categoriesToTest = ['Laptops', 'Phones', 'Monitors'];

    // Iterate over each category
    categoriesToTest.forEach((category) => {
        // Define the test case for each category
        it(`Verify Category ${category} can load products on demo blaze`, () => {
            
            // Verify products for the category
            demoblazeHomeScreen.verifyCategoryCanLoadProducts(category);
        });
    });

});