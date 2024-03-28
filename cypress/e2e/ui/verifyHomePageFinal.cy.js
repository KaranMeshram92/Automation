import DemoblazeHomeScreen from "../../models/demoblaze/demoblazeHomeScreen";
describe('Demo Blaze Test spec', () => {
    const demoblazeHomeScreen = new DemoblazeHomeScreen();
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrls').ui);
    });

    it('verify the Demo Blaze Home screen before user login', () => {

        demoblazeHomeScreen.verifyHomeTitle();

        demoblazeHomeScreen.verifyHomeLogo();

        const expectedTextValues = ['Home', 'Contact', 'About us', 'Cart', 'Log in', 'Sign up'];

        demoblazeHomeScreen.verifyHomeNavLinks(expectedTextValues);

        demoblazeHomeScreen.verifyCarouselItems(3);

        demoblazeHomeScreen.verifyHomeCategoriesSideMenu();

        demoblazeHomeScreen.verifyCopyrightsText('Copyright © Product Store 2017');

        demoblazeHomeScreen.verifyFooter();

    })
})