import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import ProductScreen from "../../models/demoblaze/productScreen";
import CartScreen from "../../models/demoblaze/cartScreen";

describe('Demo Blaze Add to Cart Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    const productScreen = new ProductScreen();
    const cartScreen = new CartScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);

        //Set up uncaught exception handler for all tests
        cy.on('uncaught:exception', (err, runnable) => {
            // Log the error and continue test execution
            cy.log(`Error occurred: ${err.message}`);
            return false;
        });
    });

    it(`Verify add to cart by item number`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();

        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(1);
        
    });

    it(`Verify add to cart by product name`, () => {
        demoblazeHomeScreen.clickOnProductByCategoryAndItemName('Phones', 'Nokia');
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        console.log(cartScreen.getCartItemsCount());
        cartScreen.verifyCartItemsCount(1);
    });

    it(`Verify Product can be deleted from cart by the index number`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(1);
        // delete the item from cart
        cartScreen.deleteItemFromCart(1);
        
    });


    it(`Verify Multiple Products can be added to cart`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 2);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(2);
        
    });

    it(`Verify Multiple Products of same type can be added to cart`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(2);
        
    });

    it(`Verify Multiple Products of different categories can be added to cart`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 2);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        // click on category Laptops and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Laptops', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        // click on category Monitors and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Monitors', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(3);

        // assert the cart total = sum of all the 3 products added to cart above
        cartScreen.verifyItemsTotalIsEqualToCartTotal();
        
    });

    it(`Verify Cart can be made empty by deleting all products from cart`, () => {
        // click on category Phones and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        // click on category Laptops and add a product to cart
        demoblazeHomeScreen.clickOnProductByCategory('Laptops', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        // click to open cart
        demoblazeHomeScreen.clickToOpenCart();
        
        // assert cart items have correct count
        cartScreen.verifyCartItemsCount(2);

        // delete all items from cart
        cartScreen.deleteItemFromCart(1);
        cartScreen.deleteItemFromCart(1);

        // assert cart is empty
        cartScreen.verifyCartIsEmpty();
        
    });

});