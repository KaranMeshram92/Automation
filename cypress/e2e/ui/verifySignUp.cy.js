import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import DataUtils from "../../utils/helper/dataUtils";

describe('Log In Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });


    it('Verify Sign up on Demo Blaze Home with empty user name and password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doSignUp();
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.signupErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Sign up on Demo Blaze Home with correct user name but empty password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doSignUp('testuser');
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.signupErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Sign up on Demo Blaze Home with empty user name but some password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doSignUp('', 'testpassword');
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.signupErrorMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Sign up on Demo Blaze Home with existing user name and password', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();

        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            demoblazeHomeScreen.doSignUp('test', 'test');
            cy.get('@alertStub').should('be.calledWith', demoblazeHomeScreen.signupUserAlreadyExistsMessage);
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    });

    it('Verify Sign up on Demo Blaze Home with a new username and password which is not existing in demo blaze', () => {
        // Generate random username and password
        const randomUsername = DataUtils.generateRandomString(5);
        const randomPassword = DataUtils.generateRandomString(5);
    
        // Click on the sign-up link to open the sign-up modal
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
    
        // Verify the sign-up form elements
        demoblazeHomeScreen.verifySignUpForm();
    
        // Perform sign-up with random username and password
        demoblazeHomeScreen.doSignUp(randomUsername, randomPassword);
    
        // Verify that an alert is displayed indicating user already exists
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal(demoblazeHomeScreen.signupSuccessMessage);
        });
    });

});