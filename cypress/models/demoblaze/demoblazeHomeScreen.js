import DataUtils from "../../utils/helper/dataUtils";
export default class DemoblazeHomeScreen {
    constructor() {
        this.url = 'https://www.demoblaze.com/index.html';
        this.title = 'STORE';
        this.homeLogo = 'a#nava';
        this.navLinks = 'a.nav-link';
        this.carouselItems = 'div.carousel-inner div';
        this.homeCategories = 'a#itemc';
        this.footerCopyright = '.m-0';
        this.footerSection = '#footc';
        this.captionClass = '.caption';
        this.navigationBar = 'div#navbarExample';
        this.videoButton = '.vjs-poster';
        this.contactUsEmail = '#recipient-email';
        this.contactUsName = '#recipient-name';
        this.contactUsMessage = '#message-text';
        this.contactUsModal = 'div.modal-dialog';
        this.loginUserName = '#loginusername';
        this.loginPassword = '#loginpassword';
        this.loginModal = '#logInModal';
        this.nameOfLoginUser = '#nameofuser';
        this.loginButton = '#login2';
        this.logoutButton = '#logout2';


        this.signUpUserName = '#sign-username';
        this.signUpPassword = '#sign-password';
        this.signUpModal = '#signInModal';

        this.loginErrorMessage = 'Please fill out Username and Password.';
        this.signupErrorMessage = 'Please fill out Username and Password.';
        this.signupUserAlreadyExistsMessage = 'This user already exist.';
        this.signupSuccessMessage = 'Sign up successful.';

        this.categoriesText = ['Phones', 'Laptops', 'Monitors'];
        this.categoryMapping = {
            'Laptops': 'notebook',
            'Phones': 'phone',
            'Monitors': 'monitor'
        };
        this.footerTexts = [
            'We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.',
            'Address: 2390 El Camino Real',
            'Phone: +440 123456',
            'Email: demo@blazemeter.com'
        ];

    }

    verifyHomeTitle() {
        cy.title().should('eq', this.title);
    }

    verifyHomeLogo() {
        cy.get(this.homeLogo).should('be.visible');
    }

    verifyHomeNavLinks(expectedTextValues) {
        // Assert the count of <a> items within <div id="navbarExample" class="navbar-collapse collapse">
        cy.get(this.navLinks).not('[style="display:none"]').should('have.length', expectedTextValues.length);

        // Iterate through each visible <a> element and compare its text content with expected values
        cy.get(this.navLinks).not('[style="display:none"]').each(($a, index) => {
            cy.wrap($a).invoke('text').then((text) => {
                expect(text.trim()).to.contain(expectedTextValues[index]);
            });
        });
    }

    verifyCarouselItems(expectedCount) {
        cy.get(this.carouselItems).should('have.length', expectedCount);
    }

    verifyHomeCategoriesSideMenu() {
        // Assert that the <a id="cat"> element has 3 sub-child <a id="itemc"> elements
        cy.get(this.homeCategories).should('have.length', this.categoriesText.length);

        // Iterate through each sub-child <a> element and assert its text content
        cy.get(this.homeCategories).each(($itemc, index) => {
            cy.wrap($itemc).invoke('text').then((text) => {
                expect(text.trim()).to.equal(this.categoriesText[index]);
            });
        });
    }

    verifyCopyrightsText(expectedText) {

        cy.get(this.footerCopyright).should('contain.text', expectedText);
    }

    verifyFooter() {
        // Fotter should be visible
        cy.get(this.footerSection).should('be.visible');
        cy.get(this.footerSection)
            .find(this.captionClass)
            .find('p')
            .should('have.length', this.footerTexts.length)
            .each(($p, index) => {
                // Get the text content of the <p> element and replace newline characters with spaces
                const actualText = $p.text().replace(/\n/g, ' ');

                // Normalize whitespace in actual and expected text
                const actualNormalized = actualText.replace(/\s+/g, ' ').trim();
                const expectedNormalized = this.footerTexts[index].replace(/\s+/g, ' ').trim();

                // Assert the modified text content matches the expected text
                expect(actualNormalized).to.equal(expectedNormalized);
            });
    }

    clickNavLinkByText(linkText) {
        // Convert the specified link text to lowercase for case insensitive comparison
        const linkTextLower = linkText.toLowerCase();

        // Get all <a> elements with class 'nav-link' within <div id="navbarExample">
        cy.get(this.navigationBar).find(this.navLinks).each(($link) => {
            // Extract the text of the link and convert it to lowercase
            const linkTextContent = $link.text().trim().toLowerCase();

            // Check if the link text contains the specified text (case insensitive)
            if (linkTextContent.includes(linkTextLower)) {
                // If the link text contains the specified text, click on the link
                cy.wrap($link).click();
            }
        });
    }

    verifyContactForm() {
        // Verify that the email, contact name, and message input fields are visible
        cy.get(this.contactUsEmail).should('be.visible');
        cy.get(this.contactUsName).should('be.visible');
        cy.get(this.contactUsMessage).should('be.visible');

        // Verify that the "Send message" button is visible
        cy.get(this.contactUsModal) // Get the div with class modal-dialog
            .contains('Send message') // Check if the button contains the text "Send message"
            .should('be.visible'); // Assert that the button is visible

        // Verify that the "Close" button is visible
        cy.get(this.contactUsModal) // Get the div with class modal-dialog
            .contains('Close') // Check if the button contains the text "Close"
            .should('be.visible'); // Assert that the button is visible
    }

    fillContactFormAndSendMessage() {
        // Generate random email, contact name, and message
        const randomEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
        const randomName = `Contact_${Math.floor(Math.random() * 1000)}`;
        const randomMessage = DataUtils.generateRandomString(100);

        // Enter the generated email, contact name, and message into their respective input fields
        cy.get(this.contactUsEmail).type(randomEmail, { force: true });
        cy.get(this.contactUsName).type(randomName, { force: true });
        cy.get(this.contactUsMessage).type(randomMessage, { force: true });

        // Click on the "Send message" button and wait for the alert dialog box
        cy.window().then(win => {
            cy.stub(win, 'alert').as('alertStub');
            cy.get(this.contactUsModal) // Get the div with class modal-dialog
                .contains('Send message') // Find the button containing the text "Send message"
                .click(); // Click on the button
            cy.get('@alertStub').should('be.calledWith', 'Thanks for the message!!');
        });

        // Click OK on the alert dialog box
        cy.on('window:alert', cy.stub().as('alert'));
    }

    verifyAboutUsVideoToBePlaying() {
        // Click on the video poster
        cy.get(this.videoButton).click();

        // Wait for the video to start playing
        cy.get('video').should('have.prop', 'paused', false);
    }

    verifyLoginForm() {
        // Verify that the user name and password are visible
        cy.get(this.loginUserName).should('be.visible');
        cy.get(this.loginPassword).should('be.visible');

        // Verify that the "Send message" button is visible
        cy.get(this.loginModal) // Get the div with class modal-dialog
            .contains('Log in') // Check if the button contains the text "Send message"
            .should('be.visible'); // Assert that the button is visible

        // Verify that the "Close" button is visible
        cy.get(this.loginModal) // Get the div with class modal-dialog
            .contains('Close') // Check if the button contains the text "Close"
            .should('be.visible'); // Assert that the button is visible
    }

    verifySignUpForm() {
        // Verify that the user name and password are visible
        cy.get(this.signUpUserName).should('be.visible');
        cy.get(this.signUpPassword).should('be.visible');

        // Verify that the "Send message" button is visible
        cy.get(this.signUpModal) // Get the div with class modal-dialog
            .contains('Sign up') // Check if the button contains the text "Send message"
            .should('be.visible'); // Assert that the button is visible

        // Verify that the "Close" button is visible
        cy.get(this.signUpModal) // Get the div with class modal-dialog
            .contains('Close') // Check if the button contains the text "Close"
            .should('be.visible'); // Assert that the button is visible
    }

    doLogin(username = '', password = '') {
        // If username and password are provided, fill them in
        if (username !== '') {
            cy.get(this.loginUserName).should('be.visible').type(username, { force: true });
        }
        if (password !== '') {
            cy.get(this.loginPassword).should('be.visible').type(password, { force: true });
        }
        cy.get(this.loginModal).find('button') // Get the div with class modal-dialog
            .contains('Log in') // Check if the button contains the text "Send message"
            .click();
    }

    verifyLoginInSuccess(username) {
        // Verify that the username is displayed as welcome message
        cy.get(this.nameOfLoginUser).should('have.text', `Welcome ${username}`);

        // Verify that the logout button is visible and login button is invisible
        cy.get(this.logoutButton).should('be.visible');
        cy.get(this.loginButton).should('not.be.visible');
    }

    clickLogOutAndVerify() {
        // Click on the logout button
        cy.get(this.logoutButton).click();

        // Verify that the login button is visible and logout button is invisible
        cy.get(this.loginButton).should('be.visible');
        cy.get(this.logoutButton).should('not.be.visible');
    }

    doSignUp(username = '', password = '') {
        // If username and password are provided, fill them in
        if (username !== '') {
            cy.get(this.signUpUserName).should('be.visible').type(username, { force: true });
        }
        if (password !== '') {
            cy.get(this.signUpPassword).should('be.visible').type(password, { force: true });
        }
        cy.get(this.signUpModal).find('button') // Get the div with class modal-dialog
            .contains('Sign up') // Check if the button contains the text "Send message"
            .click();
    }

    clickCategoryByName(categoryName) {
        // Find the <a> element with id="itemc" containing the category name
        cy.get(this.homeCategories)
            .contains(this.homeCategories, categoryName)
            .click();
    }

    verifyCategoryCanLoadProducts(category) {
        // Map the category name to its corresponding API value
        const apiCategory = this.categoryMapping[category];

        // Intercept the network request to https://api.demoblaze.com/bycat with the expected body
        cy.intercept('POST', '**/bycat', (req) => {
            // Check if the request body matches the expected body
            expect(req.body).to.deep.equal({ cat: apiCategory });
        }).as('apiRequest');

        this.clickCategoryByName(category);

        // Wait for the intercepted request to complete
        cy.wait('@apiRequest').then((interception) => {
            // Assert that the intercepted request was successful
            expect(interception.response.statusCode).to.equal(200);

            // Check if the response body contains the 'Items' key
            expect(interception.response.body).to.have.property('Items');

            // Assert that the 'Items' array is not empty
            expect(interception.response.body.Items).to.have.length.above(0);
        });
    }
}
