// Import custom commands
import './commands/apiAssertionCommands';

describe('User IDs API Test', () => {

    it('[GET] /user/ids should return a valid response for user IDs', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                cy.assertGetUserIdsResponse(response);
            });
    });

    it('[GET] /user/ids should return a valid response for user IDs and fetch user details for all user IDs', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                cy.assertGetUserIdsResponse(response);
                const userIds = response.body;

                // Iterate over each user ID and make a request to get user details
                userIds.forEach(userId => {
                    // Make a request to get user details using the user ID
                    cy.request('GET', Cypress.config('baseUrls').api + '/user/' + userId)
                        .then((userDetailsResponse) => {
                            cy.assertUserDetailsResponse(userDetailsResponse);
                        });
                });
            });
    });

    it('[GET] /user/ids should return a valid response for user IDs and fetch user details for a random user Id', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                cy.assertGetUserIdsResponse(response);

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        cy.assertUserDetailsResponse(userDetailsResponse);
                    });
            });
    });

    it('[GET] /user/:id should return a 400 response for bad request', () => {
        // Generate a random 3-character string
        const invalidId = Math.random().toString(36).substring(2, 5);

        // Make a request to the user IDs endpoint with the generated invalid ID
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrls').api + '/user/' + invalidId,
            failOnStatusCode: false
        }).then((response) => {
            // Assert the response status code is 400
            expect(response.status).to.equal(400);

            // Assert the response body contains the expected message
            expect(response.body).to.deep.equal({
                status_code: '400',
                message: `${invalidId} is not a valid id`
            });
        });
    });

    it('[POST] /signin should Sign in if phone_no and otp is correct for particular user', () => {
        // Declare variables to hold phone_no and otp
        let firstName;
        let lastName;
        let permission;
        let phoneNo;
        let otp;

        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {

                cy.assertGetUserIdsResponse(response);

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        cy.assertUserDetailsResponse(userDetailsResponse);

                        // Extract phone_no and otp from user details response body
                        firstName = userDetailsResponse.body.first_name;
                        lastName = userDetailsResponse.body.last_name;
                        permission = userDetailsResponse.body.permission;
                        phoneNo = userDetailsResponse.body.phone_no;
                        otp = userDetailsResponse.body.otp;

                        // Make a request to the signin endpoint using extracted phone_no and otp
                        cy.request({
                            method: 'POST',
                            url: Cypress.config('baseUrls').api + '/signin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: {
                                "phone_no": phoneNo,
                                "otp": otp
                            }
                        }).then((signinResponse) => {
                            cy.assertSignInResponse(signinResponse, { first_name: firstName, last_name: lastName, permission: permission, id: randomUserId });
                        });
                    });
            });
    });

    it('[POST] /signin should return a 404 response for invalid user', () => {
        // Generate random phone number and OTP
        const phoneNo = Math.floor(Math.random() * 10000000000).toString();
        const otp = Math.floor(Math.random() * 100000).toString();

        // Make a request to the signin endpoint with invalid user data
        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrls').api + '/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "phone_no": phoneNo,
                "otp": otp
            },
            failOnStatusCode: false  // Allow Cypress to handle non-2xx responses
        }).then((response) => {
            // Call the custom assertion command
            cy.assertSignInErrorResponse(response);
        });
    });


    it('[POST] /signin should return a 404 response if Sign in with valid phone numer but invalid OTP', () => {
        // Declare variables to hold phone_no and otp
        let firstName;
        let lastName;
        let permission;
        let phoneNo;

        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                cy.assertGetUserIdsResponse(response);

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        cy.assertUserDetailsResponse(userDetailsResponse);

                        // Extract phone_no and otp from user details response body
                        firstName = userDetailsResponse.body.first_name;
                        lastName = userDetailsResponse.body.last_name;
                        permission = userDetailsResponse.body.permission;
                        phoneNo = userDetailsResponse.body.phone_no;

                        // Generate random OTP for the second API call
                        const randomOtp = Math.floor(Math.random() * 100000).toString();

                        // Make a request to the signin endpoint using extracted phone_no and random OTP
                        cy.request({
                            method: 'POST',
                            url: Cypress.config('baseUrls').api + '/signin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: {
                                "phone_no": phoneNo,
                                "otp": randomOtp // Use random OTP instead 
                            },
                            failOnStatusCode: false
                        }).then((signinResponse) => {
                            // Call the custom assertion command
                            cy.assertSignInErrorResponse(signinResponse);
                        });
                    });
            });
    });

    it('[POST] /signin should return a 500 response for empty request body', () => {
        // Make a request to the signin endpoint with an empty request body
        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrls').api + '/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {},
            failOnStatusCode: false  // Allow Cypress to handle non-2xx responses
        }).then((response) => {
            // Assert the response status code is 500
            expect(response.status).to.equal(500);

            // Assert the response body contains the expected message
            expect(response.body).to.deep.equal({
                status_code: 500,
                status: 'Fail',
                data: {},
                message: 'Internal Server Error'
            });
        });
    });

});
