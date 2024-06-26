import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import ProductScreen from "../../models/demoblaze/productScreen";

describe('Demo Blaze can open products Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    const productScreen = new ProductScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it(`Verify for a Category can open any product by item number and add to cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        
    });

    it(`Verify for a Category can open any product by product Name and add to cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategoryAndItemName('Phones', 'Iphone');
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
    });

});