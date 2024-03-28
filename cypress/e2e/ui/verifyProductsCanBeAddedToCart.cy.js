import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import ProductScreen from "../../models/demoblaze/productScreen";
import CartScreen from "../../models/demoblaze/cartScreen";

describe('Log In Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    const productScreen = new ProductScreen();
    const cartScreen = new CartScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it(`Verify add to cart by item number`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 3);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        cartScreen.verifyCartItemsCount(1);
        
    });

    it(`Verify add to cart by product name`, () => {
        demoblazeHomeScreen.clickOnProductByCategoryAndItemName('Phones', 'Iphone');
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        demoblazeHomeScreen.clickToOpenCart();
        console.log(cartScreen.getCartItemsCount());
        cartScreen.verifyCartItemsCount(1);
    });

    it(`Verify Product can be deleted from cart by the index number`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartButton();
        
        demoblazeHomeScreen.clickToOpenCart();
        
        cartScreen.verifyCartItemsCount(1);
        cartScreen.deleteItemFromCart(1);
        
    });


    it(`Verify Multiple Products can be added to cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        demoblazeHomeScreen.clickOnProductByCategory('Phones', 2);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        demoblazeHomeScreen.clickToOpenCart();
        
        cartScreen.verifyCartItemsCount(2);
        
    });

    it(`Verify Multiple Products of same type can be added to cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        demoblazeHomeScreen.clickToOpenCart();
        
        cartScreen.verifyCartItemsCount(2);
        
    });

    it(`Verify Multiple Products of different categories can be added to cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 2);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        demoblazeHomeScreen.clickOnProductByCategory('Laptops', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        demoblazeHomeScreen.clickOnProductByCategory('Monitors', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        demoblazeHomeScreen.clickToOpenCart();
        
        cartScreen.verifyCartItemsCount(3);
       cartScreen.verifyItemsTotalIsEqualToCartTotal();
        
    });

    it(`Verify Cart can be made empty by deleting all products from cart`, () => {
        demoblazeHomeScreen.clickOnProductByCategory('Phones', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();

        demoblazeHomeScreen.clickOnProductByCategory('Laptops', 1);
        productScreen.verifyProductIsLoaded();
        productScreen.clickAddToCartAndGoBackHome();
        
        demoblazeHomeScreen.clickToOpenCart();
        
        cartScreen.verifyCartItemsCount(2);
        cartScreen.deleteItemFromCart(1);
        cartScreen.deleteItemFromCart(1);

        cartScreen.verifyCartIsEmpty();
        
    });

});