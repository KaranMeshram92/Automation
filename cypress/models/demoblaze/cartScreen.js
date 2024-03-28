export default class CartScreen {
    constructor() {
        this.cartTable = 'table.table.table-bordered.table-hover.table-striped';
        this.cartBody = 'tbody#tbody';
        this.cartItemsTable = '#tbodyid';
        this.placeOrderButton = 'button[data-target="#orderModal"]';
        this.checkOutTotalAmout = '#totalm';
        this.checkOutName = '#name';
        this.checkOutCountry = '#country';
        this.checkOutCity = '#city';
        this.checkOutCard = '#card';
        this.checkOutMonth = '#month';
        this.checkOutYear = '#year';
        this.checkOutNameAndCardMandatoryMessage = 'Please fill out Name and Creditcard.';
    }

    verifyCartIsEmpty() {
        // Assert that the table with class 'table' does not have a tbody element with id 'tbody'
        cy.get(this.cartTable).should('not.have.descendants', this.cartBody);
    }

    getCartItemsCount() {
        // Get the number of <tr> elements within the cart items table
        return cy.get(this.cartItemsTable).find('tr').its('length');
    }


    verifyCartItemsCount(expectedCount) {
        // Get the actual count of <tr> elements within the cart items table
        cy.get(this.cartItemsTable).find('tr').its('length').should('eq', expectedCount);
    }


    deleteItemFromCart(itemIndex) {
        // Get the cart item count before deletion
        this.getCartItemsCount().then(cartItemCountBeforeDelete => {
            if (itemIndex > cartItemCountBeforeDelete) {
                cy.log('Item index is out of range. Cannot delete.');
                return; // Do nothing and return if item index is out of range
            }

            // Intercept the API call before deleting the item
            cy.intercept('POST', '**/deleteitem').as('deleteItem');

            // Locate the delete link for the item at the specified index and click on it
            cy.get(`${this.cartItemsTable} tr`).eq(itemIndex - 1).find('td').contains('a', 'Delete').click();

            cy.wait('@deleteItem').its('response.statusCode').should('eq', 200);

            // Check if the cart item count decreased by one after deletion
            // if(!this.verifyCartIsEmpty) {
            //     this.getCartItemsCount().should('eq', cartItemCountBeforeDelete - 1);
            // }
            
        });
    }


    calculateTotalPriceOfItemsInCart() {
        return new Cypress.Promise((resolve, reject) => {
            let totalPrice = 0;

            // Iterate through each row in the cart items table
            cy.get(this.cartItemsTable).find('tr').each(($row, index, $rows) => {
                // Extract the text from the third <td> element (index 2) which contains the price
                const priceText = $row.find('td').eq(2).text();

                // Extract the numerical value from the price text (assuming it's in a valid format like "$X.XX")
                const price = parseFloat(priceText.replace('$', ''));

                // Add the price to the total
                totalPrice += price;

                // Check if it's the last row and resolve the promise with the total price
                if (index === $rows.length - 1) {
                    resolve(totalPrice);
                }
            });
        }).then(totalPrice => {
            // Log the total price for visibility
            cy.log(`Total price of items in cart: $${totalPrice.toFixed(2)}`);
            return totalPrice; // Return the total price
        });
    }



    verifyItemsTotalIsEqualToCartTotal() {
        // Get the total price of items in the cart
        this.calculateTotalPriceOfItemsInCart().then(itemsTotal => {
            // Log both totals for visibility
            console.log(`Items Total: ${itemsTotal}`);

            cy.get('#totalp').invoke('text').then(cartTotalText => {
                // Extract the numerical value from the cart total text (assuming it's in a valid format like "Total: $X.XX")
                const cartTotal = parseFloat(cartTotalText.replace('Total: $', ''));

                // Log both totals for visibility
                cy.log(`Items Total: $${itemsTotal.toFixed(2)}`);
                cy.log(`Cart Total: $${cartTotal.toFixed(2)}`);

                // Assert that the total price of items in the cart is equal to the cart total
                expect(itemsTotal).to.equal(cartTotal);
            });
        });
    }

    clickPlaceOrder() {
        cy.get(this.placeOrderButton).click();
        cy.get(this.checkOutTotalAmout).should('be.visible');
        cy.get(this.checkOutName).should('be.visible');
        cy.get(this.checkOutCountry).should('be.visible');
        cy.get(this.checkOutCity).should('be.visible');
        cy.get(this.checkOutCard).should('be.visible');
        cy.get(this.checkOutMonth).should('be.visible');
        cy.get(this.checkOutYear).should('be.visible');
    }

    fillCheckoutFields(nameValue = '', countryValue = '', cityValue = '', cardValue = '', monthValue = '', yearValue = '') {
        cy.get(this.checkOutTotalAmout).should('be.visible');
        cy.get(this.checkOutName).should('be.visible').type(nameValue, { force: true });
        cy.get(this.checkOutCountry).should('be.visible').type(countryValue, { force: true });
        cy.get(this.checkOutCity).should('be.visible').type(cityValue, { force: true });
        cy.get(this.checkOutCard).should('be.visible').type(cardValue, { force: true });
        cy.get(this.checkOutMonth).should('be.visible').type(monthValue, { force: true });
        cy.get(this.checkOutYear).should('be.visible').type(yearValue, { force: true });
    }



    clickPurchaseButton() {
        cy.contains('button', 'Purchase').click();
    }

    verifyPurchaseIsSuccessful() {
        cy.get('.sweet-alert > h2').should('have.text', 'Thank you for your purchase!');
        cy.get('.lead').invoke('text').then(text => {
            // Split the text by <br> tags
            const parts = text.split('<br>');
            // Extract the ID (assuming it's the first part)
            const idPart = parts[0].trim(); // Trim any leading or trailing whitespace
            // Extract the ID value (assuming it's after the colon)
            const idValue = idPart.split(':')[1].trim();
            // Perform the assertion to check if the ID value is a number
            expect(parseInt(idValue)).to.be.a('number').and.not.NaN;
        });
    }

}