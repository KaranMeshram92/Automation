export default class ProductScreen {
    constructor() {
        this.productImage = '.product-image';
        this.productName = '#tbodyid .name';
        this.productPrice = '#tbodyid .price-container';
        this.productDescription = '#more-information';
        this.addToCartButton = 'a:contains("Add to cart")'; // Selector for Add to Cart button

        this.addToCartSuccessMessage = 'Product added';
    }

    verifyProductImageIsDisplayed() {
        cy.get(this.productImage).should('be.visible');
    }

    verifyProductNameIsDisplayed(expectedName = '') {
        cy.get(this.productName).should('be.visible');
        if (expectedName !== '') {
            cy.get(this.productName).should('have.text', expectedName);
        }
    }

    verifyProductPriceIsDisplayed() {
        cy.get(this.productPrice).should('be.visible').then($priceContainer => {
            const priceText = $priceContainer.text();
            const price = parseFloat(priceText.replace('$', ''));
            expect(price).to.be.above(0);
        });
    }

    verifyProductDescriptionIsDisplayed() {
        cy.get(this.productDescription).should('be.visible');
    }

    verifyAddToCartButtonIsVisible() {
        cy.get(this.addToCartButton).should('be.visible');
    }

    verifyProductIsLoaded(expectedName = '') {
        this.verifyProductImageIsDisplayed();
        this.verifyProductNameIsDisplayed(expectedName);
        this.verifyProductPriceIsDisplayed();
        this.verifyProductDescriptionIsDisplayed();
        this.verifyAddToCartButtonIsVisible();
    }

    clickAddToCartButton() {
         // Intercept the API call before deleting the item
         cy.intercept('POST', '**/addtocart').as('addToCartItem');
        cy.get(this.addToCartButton).click();

        cy.wait('@addToCartItem').its('response.statusCode').should('eq', 200);

        // // Wait for alert to be shown
        // cy.on('window:alert', (alertText) => {
        //     expect(alertText).to.eq(this.addToCartSuccessMessage); // Assert alert text
        //     cy.log('Alert text:', alertText);
        // });

        // // Close the alert
        // cy.on('window:alert', () => {
        //     return true; // Automatically close the alert
        // });
    }

    clickAddToCartAndGoBackHome() {
        this.clickAddToCartButton();
        cy.contains('a', 'Home').click();
    }
}
