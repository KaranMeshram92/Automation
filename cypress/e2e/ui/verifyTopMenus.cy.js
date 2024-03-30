import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
import CartScreen from "../../models/demoblaze/cartScreen";

describe('Demo Blaze Navigation Tests', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    const cartScreen = new CartScreen();

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it('Verify Navigation menu Contact on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('Contact');
        demoblazeHomeScreen.verifyContactForm();
        demoblazeHomeScreen.fillContactFormAndSendMessage();
    });

    it('Verify Navigation menu About Us on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('About us');
        demoblazeHomeScreen.verifyAboutUsVideoToBePlaying();
    });

    it('Verify Navigation menu Cart on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('Cart');
        cartScreen.verifyCartIsEmpty();
    });

    it('Verify Navigation menu Log in on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('Log in');
        demoblazeHomeScreen.verifyLoginForm();
    });

    it('Verify Navigation menu Sign up on Demo Blaze Home', () => {
        demoblazeHomeScreen.clickNavLinkByText('Sign up');
        demoblazeHomeScreen.verifySignUpForm();
    });
});