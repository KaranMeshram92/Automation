# DemoBlaze Automation 

Welcome to the Demo Blaze Purchase Flow Testing Automation repository! This repository contains automated tests written in Cypress for ensuring the reliability and functionality of Demo Blaze website features.

## Overview

This test suite is built using **Cypress, a powerful end-to-end testing framework**, to automate the testing process for Demo Blaze Purchase   functionality. The framework leverages **Mochawesome** for generating detailed and visually appealing HTML reports, making it easier to analyze test results.

## Setup Instructions

To set up this repository and run the automated tests on your local machine, follow these steps:

1. **Check Node.js Installation**: Ensure that Node.js is installed on your system. If not, you can download and install it from [Node.js Official Website](https://nodejs.org/).

2. **Verify Node Version Manager (nvm) Installation**: Make sure Node Version Manager (nvm) is installed on your system. If not, follow the installation instructions provided in the [nvm GitHub repository](https://github.com/nvm-sh/nvm).

3. **Clone the Repository**: Clone this repository `https://github.com/KaranMeshram92/Automation.git` to your local machine and switch to the branch named `main` using the following Git command:
   ```bash
   git clone https://github.com/KaranMeshram92/Automation.git
   cd Automation
   git checkout main
   npm i
   ```
4. **If Cypress is still not installed**: Run command
    ```bash
    npm install cypress
    ```

## Setup Visual Studio Code (Optional)

If you prefer to use Visual Studio Code as your code editor, you can install the necessary plugins for a better development experience.

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking on the square icon on the sidebar or by pressing `Ctrl+Shift+X`.
3. In the Extensions view, search for "Open in Browser" extension.
4. Click on the "Install" button next to the extension.
5. Once installed, you can use the extension to easily open files or URLs in your default web browser.

# Instructions to Run the Tests

To run the tests for Demo Blaze feature, follow the instructions below:

## 1. Headed Mode

In headed mode, you can visually interact with the tests using the Cypress Test Runner interface.

1. Open your terminal or command prompt.
2. Run the following command:
   ```bash
   npx cypress open
3. This will open the Cypress Home screen with - Welcome to Cypress message
4. Choose E2E testing
5. Choose Electron Browser to execute the tests
6. Navigate to the `cypress\e2e` folder.
7. The API tests are in `cypress\e2e\api` folder
8. All the UI tests are in `cypress\e2e\ui` folder
9. Within the Cypress Test Runner interface, explore the available tests located in the `cypress\e2e` folder, and click on the desired test to initiate its execution.

## 2. Headless Mode Using Command Line

In headless mode, tests run without a graphical interface and are executed directly from the command line.

1. Open your terminal or command prompt.
2. Run the following command:
   ```bash
   npx cypress run 
   
   This command will run all the tests in headless mode including API and UI tests 

3. If you want to run a specific test spec file, use the following command:
    ```bash
   npx cypress run --spec ".\cypress\e2e\ui\${replace with name of test}.cy.js"

   eg . 
    
    npx cypress run --spec ".\cypress\e2e\ui\verifyCanOpenProducts.cy.js"
    npx cypress run --spec ".\cypress\e2e\api\apiTestsRefactor.cy.js"
    ```
4. To see the result you can check `.html` report generated after test completion under `cypress\reports\mochawesome_${timestamp}.html`
5. Right click on the `html` report and open it in any browser of your choice

## Folder Structure

1. **Page Object Model (POM)**: The test automation framework follows the **Page Object Model design pattern, enhancing code reusability and maintainability**. 
All the page objects for pages like **HomeScreen, Product Screen, and Cart screen** are located in `models\demoblaze` folder. These page objects contain **all locators and associated reusable methods** for each of these pages, which can be accessed in any test now and in the future.

2. **Automated Test Specs**: The automated tests that use these page objects are located in `cypress\e2e` folder with files ending with `.cy.js`.

3. **Cypress Commands Feature**: Cypress command feature is utilized in API tests to put common API assertions in reusable commands located in `\cypress\e2e\api\commands` folder.

4. **Common Utilities**: All the common utilities which can be used across the test framework are placed in `\utils\helper` folder, e.g., `generateRandomString(length)`.

## Manual Tests

All the manual tests for Demo Blaze have been placed in the `ManualTests` folder in an `.xlsx` file named `DemoBlazeMasterTestSuite`.

## Performance Test Automation

I have gone the extra mile to design and implement performance test automation using **JMeter** for the demo blaze website. Details of which can be seen in [PERFORMANCE.md](PERFORMANCE.md) and under the **PerformanceTest folder** which has all instructions.


## Highlights

1. **No Static Wait Commands**: The automation framework utilizes no static wait commands, ensuring that tests run as fast as the demo blaze website can load, improving efficiency and reducing test execution time.

2. **Cypress Intercept Feature**: I have leveraged Cypress's intercept feature `cy.intercept` to ensure that any page actions check the API in the network tab to be successful. This approach enhances test robustness and minimizes the likelihood of flakiness in test results.

3. **Fast Execution**: The automation suite is optimized for speed and can execute in less than 2 minutes and 30 seconds, enabling quick feedback on the application's functionality and stability.

4. **Performance Test Automation**: I have gone the extra mile to design and implement performance test automation using **JMeter** for the demo blaze website. Details of which can be seen in [PERFORMANCE.md](PERFORMANCE.md) and under the **PerformanceTest folder** which has all instructions.


## CI/CD with GitHub Actions

1. Continuous integration and continuous deployment **(CI/CD)** are implemented using **GitHub Actions.**
2. A workflow configuration file named `cypress-tests.yml` in the `.github\workflows` folder is used to trigger Cypress tests.
3. Cypress tests are automatically initiated whenever there's a **code change pushed to the main branch or a pull request opened against it**, ensuring automated testing and quick feedback on the application's functionality.