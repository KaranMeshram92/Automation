const path = require('path');

module.exports = {
  e2e: {
    supportFile: false,
    baseUrl: 'https://www.demoblaze.com/index.html',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  screenshotsFolder: "cypress/screenshots",
  screenshots: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: path.join(__dirname, 'cypress', 'reports'),
    overwrite: false,
    html: true,
    json: true,
    timestamp: new Date().toISOString().replace(/:/g, '-'),
    timestampFormat: 'YYYY-MM-DDTHHmmss',
    screenshots: "cypress/screenshots",
    includeScreenshots: true, // Enable screenshots in the report
    screenshotsOnlyOnFailure: false
  },
  viewportWidth: 1920, // Set default viewport width
  viewportHeight: 1080, // Set default viewport height
};