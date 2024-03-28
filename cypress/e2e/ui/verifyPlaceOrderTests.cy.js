import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import ProductScreen from "../../models/demoblaze/productScreen";
import CartScreen from "../../models/demoblaze/cartScreen";

describe('Log In Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    const productScreen = new ProductScreen();
    const cartScreen = new CartScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);

        // Set up uncaught exception handler for all tests
        cy.on('uncaught:exception', (err, runnable) => {
            // Log the error and continue test execution
            cy.log(`Error occurred: ${err.message}`);
            return false;
        });
    });

    it(`Verify items in cart can be checkout to place order`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        cartScreen.verifyCartItemsCount(1);
        cartScreen.clickPlaceOrder();
        cartScreen.fillCheckoutFields('John Doe', 'United States', 'New York', '1234567890123456', '12', '2025');
        cartScreen.clickPurchaseButton();
        cartScreen.verifyPurchaseIsSuccessful();
        
    });

});