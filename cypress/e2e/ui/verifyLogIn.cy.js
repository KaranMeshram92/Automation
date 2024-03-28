import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";

describe('Log In Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });


    it('Verify Log in on Demo Blaze Home with empty user name and password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Log in');
        demoblazeHomeScreen.verifyLoginForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doLogin();
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.loginErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Log in on Demo Blaze Home with correct user name but empty password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Log in');
        demoblazeHomeScreen.verifyLoginForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doLogin('testuser');
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.loginErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Log in on Demo Blaze Home with empty user name but some password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Log in');
        demoblazeHomeScreen.verifyLoginForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doLogin('', 'testpassword');
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.loginErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Log in on Demo Blaze Home with correct username and password', () => {

        const username = 'test';
        const password = 'test';
        // Click on the login link to open the login modal
        demoblazeHomeScreen.clickNavLinkByText('Log in');

        // Verify the login form elements
        demoblazeHomeScreen.verifyLoginForm();

        // Perform login with correct username and password
        demoblazeHomeScreen.doLogin(username, password);

        // Verify that no alert is displayed
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.be.undefined;
        });

        demoblazeHomeScreen.verifyLoginInSuccess(username);

    });

    it('Verify Log out on Demo Blaze Home after Log In with correct username and password', () => {

        const username = 'test';
        const password = 'test';
        // Click on the login link to open the login modal
        demoblazeHomeScreen.clickNavLinkByText('Log in');

        // Verify the login form elements
        demoblazeHomeScreen.verifyLoginForm();

        // Perform login with correct username and password
        demoblazeHomeScreen.doLogin(username, password);

        // Verify that no alert is displayed
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.be.undefined;
        });

        demoblazeHomeScreen.verifyLoginInSuccess(username);

        demoblazeHomeScreen.clickLogOutAndVerify();

    });

});