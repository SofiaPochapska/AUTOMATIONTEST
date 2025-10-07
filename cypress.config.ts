import { defineConfig } from "cypress";
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  e2e: {
    baseUrl: "https://theconnectedshop.com",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: 'cypress/support/e2e.ts',

    // Setup Allure plugin
    setupNodeEvents(on, config) {
      // register allure writer plugin
      allureWriter(on, config);

      // you can add more node events here if needed
      return config;
    },
  },

  projectId: "sagdw6",

  // Optional: Allure default results folder
  reporter: '@shelex/cypress-allure-plugin',
  reporterOptions: {
    resultsDir: 'allure-results',
  },
});
