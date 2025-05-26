const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
            on('task', {
        log(message) {
          console.log(message); // Handles all log messages
          return null;
        },
        // Add this new task to handle key-value pairs
        logTranslation({ key, actual, expected }) {
          console.log(`[TRANSLATION] ${key}`);
          console.log('Actual:', actual);
          console.log('Expected:', expected);
          return null;
        },
        logRTP(value) {
        console.log('RTP Value:', value);
        return null;
  }
      });
    },
    reporter: 'mochawesome',
    reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    overwrite: false,
    html: false,
    json: true},
    testIsolation: false,
  },
});

