import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import ProductScreen from "../../models/demoblaze/productScreen";
import CartScreen from "../../models/demoblaze/cartScreen";

describe('Demo Blaze Place Order Tests', () => {
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
        cartScreen.fillCheckoutFields('John Wick', 'United States', 'New York', '1234567890123456', '12', '2025');
        cartScreen.clickPurchaseButton();
        cartScreen.verifyPurchaseIsSuccessful();
        
    });

    it(`Verify Palce order should fail if name is not provided`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        cartScreen.verifyCartItemsCount(1);
        cartScreen.clickPlaceOrder();
        cartScreen.fillCheckoutFields('John Wick', 'USA', 'New York', '1234567890123456', '01', '2024');
        // clear the name field
        cy.get(cartScreen.checkOutName).clear();
        
        // assert that alert box is shown with correct message
        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            cartScreen.clickPurchaseButton();
            cy.get('@alertStub').should('be.calledWith', cartScreen.checkOutNameAndCardMandatoryMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
        
        
    });

    it(`Verify Palce order should fail if credit card is not provided`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        cartScreen.verifyCartItemsCount(1);
        cartScreen.clickPlaceOrder();
        cartScreen.fillCheckoutFields('John Wick', 'USA', 'New York', '1234567890123456', '01', '2024');
        
        // clear the credit card field
        cy.get(cartScreen.checkOutCard).clear();
        
        // assert that alert box is shown with correct message
        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            cartScreen.clickPurchaseButton();
            cy.get('@alertStub').should('be.calledWith', cartScreen.checkOutNameAndCardMandatoryMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    
    });

});