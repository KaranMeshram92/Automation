import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";

describe('Log In Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });


    it('Verify Navigation menu Sign up on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();
    });

});