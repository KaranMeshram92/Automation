describe('User IDs API Test', () => {
    it('[GET] /user/ids should return a valid response for user IDs', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                // Print the response body
                cy.log('Response Body:', response.body);

                // Print the response status code
                cy.log('Response Status Code:', response.status);

                // Print the response headers
                cy.log('Response Headers:', response.headers);

                // Assert the response status
                expect(response.status).to.equal(200);

                // Assert the response body contains an array of user IDs
                expect(response.body).to.be.an('array').that.is.not.empty;
                // Add more assertions as needed
            });
    });

    it('[GET] /user/ids should return a valid response for user IDs and fetch user details for all user IDs', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                // Print the response body
                cy.log('Response Body:', response.body);

                // Print the response status code
                cy.log('Response Status Code:', response.status);

                // Print the response headers
                cy.log('Response Headers:', response.headers);

                // Assert the response status
                expect(response.status).to.equal(200);

                // Assert the response body contains an array of user IDs
                expect(response.body).to.be.an('array').that.is.not.empty;

                const userIds = response.body;

                // Iterate over each user ID and make a request to get user details
                userIds.forEach(userId => {
                    // Make a request to get user details using the user ID
                    cy.request('GET', Cypress.config('baseUrls').api + '/user/' + userId)
                        .then((userDetailsResponse) => {
                            // Print user details response body
                            cy.log('User Details Response Body:', userDetailsResponse.body);

                            // Print user details response status code
                            cy.log('User Details Response Status Code:', userDetailsResponse.status);

                            // Print user details response headers
                            cy.log('User Details Response Headers:', userDetailsResponse.headers);

                            // Assert the user details response status
                            expect(userDetailsResponse.status).to.equal(200);

                            // Assert the user details response contains values for all fields
                            expect(userDetailsResponse.body).to.have.property('first_name').that.is.a('string').and.not.empty;
                            expect(userDetailsResponse.body).to.have.property('last_name').that.is.a('string').and.not.empty;
                            expect(userDetailsResponse.body).to.have.property('permission').that.is.a('string').and.not.empty;
                            expect(userDetailsResponse.body).to.have.property('phone_no').that.is.a('string').and.not.empty;
                            expect(userDetailsResponse.body).to.have.property('otp').that.is.a('string').and.not.empty;

                            // Add more assertions as needed for user details
                        });
                });
            });
    });

    it('[GET] /user/ids should return a valid response for user IDs and fetch user details for a random user Id', () => {
        // Make a request to the user IDs endpoint
        cy.request('GET', Cypress.config('baseUrls').api + '/user/ids')
            .then((response) => {
                // Print the response body
                cy.log('Response Body:', response.body);

                // Print the response status code
                cy.log('Response Status Code:', response.status);

                // Print the response headers
                cy.log('Response Headers:', response.headers);

                // Assert the response status
                expect(response.status).to.equal(200);

                // Assert the response body contains an array of user IDs
                expect(response.body).to.be.an('array').that.is.not.empty;

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        // Print the user details response body
                        cy.log('User Details Response Body:', userDetailsResponse.body);

                        // Print the user details response status code
                        cy.log('User Details Response Status Code:', userDetailsResponse.status);

                        // Print the user details response headers
                        cy.log('User Details Response Headers:', userDetailsResponse.headers);

                        // Assert the user details response status
                        expect(userDetailsResponse.status).to.equal(200);

                        // Assert the user details response contains values for all fields
                        expect(userDetailsResponse.body).to.have.property('first_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('last_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('permission').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('phone_no').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('otp').that.is.a('string').and.not.empty;
                    });
            });
    });

    it('[GET] /user/:id should return a 400 response for bad request', () => {
        // Make a request to the user IDs endpoint
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrls').api + '/user/xyz',
            failOnStatusCode: false
        }).then((response) => {
            // Assert the response status code is 400
            expect(response.status).to.equal(400);

            // Assert the response body contains the expected message
            expect(response.body).to.deep.equal({
                status_code: '400',
                message: 'xyz is not a valid id'
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
                // Assert the response status
                expect(response.status).to.equal(200);

                // Assert the response body contains an array of user IDs
                expect(response.body).to.be.an('array').that.is.not.empty;

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        // Assert the user details response status
                        expect(userDetailsResponse.status).to.equal(200);
                        // Assert the user details response contains values for all fields
                        expect(userDetailsResponse.body).to.have.property('first_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('last_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('permission').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('phone_no').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('otp').that.is.a('string').and.not.empty;

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
                            // Print the signin response body
                            cy.log('Signin Response Body:', signinResponse.body);

                            // Print the signin response status code
                            cy.log('Signin Response Status Code:', signinResponse.status);

                            // Print the signin response headers
                            cy.log('Signin Response Headers:', signinResponse.headers);

                            // Assert the signin response status
                            expect(signinResponse.status).to.equal(200);

                            // Assert the structure and values of the data object in the response body
                            expect(signinResponse.body).to.have.property('data').that.is.an('object').and.includes({
                                first_name: firstName,
                                last_name: lastName,
                                permission: permission,
                                id: randomUserId
                            });

                            // Assert other properties of the response body as needed
                            expect(signinResponse.body).to.have.property('status_code', 200);
                            expect(signinResponse.body).to.have.property('status', 'Pass');
                            expect(signinResponse.body).to.have.property('message', 'Sign in success');
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
            // Assert the response status code is 404
            expect(response.status).to.equal(404);

            // Assert the response body contains the expected message
            expect(response.body).to.deep.equal({
                status_code: 404,
                status: 'Not found',
                data: {},
                message: 'User not found'
            });
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
                // Assert the response status
                expect(response.status).to.equal(200);

                // Assert the response body contains an array of user IDs
                expect(response.body).to.be.an('array').that.is.not.empty;

                // Randomly select one user ID from the array
                const randomIndex = Math.floor(Math.random() * response.body.length);
                const randomUserId = response.body[randomIndex];

                // Make a request to fetch user details using the randomly selected user ID
                cy.request('GET', Cypress.config('baseUrls').api + '/user/' + randomUserId)
                    .then((userDetailsResponse) => {
                        // Assert the user details response status
                        expect(userDetailsResponse.status).to.equal(200);
                        // Assert the user details response contains values for all fields
                        expect(userDetailsResponse.body).to.have.property('first_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('last_name').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('permission').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('phone_no').that.is.a('string').and.not.empty;
                        expect(userDetailsResponse.body).to.have.property('otp').that.is.a('string').and.not.empty;

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
                            // Assert the response status code is 404
                            expect(signinResponse.status).to.equal(404);

                            // Assert the response body contains the expected message
                            expect(signinResponse.body).to.deep.equal({
                                status_code: 404,
                                status: 'Not found',
                                data: {},
                                message: 'User not found'
                            });
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
