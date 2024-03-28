export default class CartScreen {
    constructor() {
        this.cartTable = 'table.table.table-bordered.table-hover.table-striped';
        this.cartBody = 'tbody#tbody';
    }

    verifyCartIsEmpty() {
        // Assert that the table with class 'table' does not have a tbody element with id 'tbody'
        cy.get(this.cartTable).should('not.have.descendants', this.cartBody);
    }
}