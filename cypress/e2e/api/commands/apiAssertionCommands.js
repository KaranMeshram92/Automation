// Custom Cypress command to assert response status and body for successful requests
Cypress.Commands.add('assertGetUserIdsResponse', (response) => {
    // Print the response body, status code, and headers
    cy.log('Response Body:', response.body);
    cy.log('Response Status Code:', response.status);
    cy.log('Response Headers:', response.headers);

    // Assert the response status is 200
    expect(response.status).to.equal(200);

    // Assert the response body is not empty
    expect(response.body).to.be.an('array').that.is.not.empty;
});

// Custom Cypress command to assert user details response
Cypress.Commands.add('assertUserDetailsResponse', (userDetailsResponse) => {
    // Print user details response body, status code, and headers
    cy.log('User Details Response Body:', userDetailsResponse.body);
    cy.log('User Details Response Status Code:', userDetailsResponse.status);
    cy.log('User Details Response Headers:', userDetailsResponse.headers);

    // Assert the user details response status is 200
    expect(userDetailsResponse.status).to.equal(200);

    // Assert the user details response contains values for all fields
    expect(userDetailsResponse.body).to.have.property('first_name').that.is.a('string').and.not.empty;
    expect(userDetailsResponse.body).to.have.property('last_name').that.is.a('string').and.not.empty;
    expect(userDetailsResponse.body).to.have.property('permission').that.is.a('string').and.not.empty;
    expect(userDetailsResponse.body).to.have.property('phone_no').that.is.a('string').and.not.empty;
    expect(userDetailsResponse.body).to.have.property('otp').that.is.a('string').and.not.empty;
});

Cypress.Commands.add('assertSignInResponse', (response, userDetails) => {
    // Assert the response status
    expect(response.status).to.equal(200);

    // Assert the structure and values of the data object in the response body
    expect(response.body).to.have.property('data').that.is.an('object').and.includes({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        permission: userDetails.permission,
        id: userDetails.id
    });

    // Assert other properties of the response body as needed
    expect(response.body).to.have.property('status_code', 200);
    expect(response.body).to.have.property('status', 'Pass');
    expect(response.body).to.have.property('message', 'Sign in success');
});

Cypress.Commands.add('assertSignInErrorResponse', (response) => {
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