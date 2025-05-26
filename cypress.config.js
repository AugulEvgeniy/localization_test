const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
            on('task', {
        log(message) {
          console.log('[CY-TASK]', message);
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

