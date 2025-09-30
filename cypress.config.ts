import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
 
export default defineConfig({
  e2e: {
    baseUrl: "https://theconnectedshop.com",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: 'cypress/support/e2e.ts',

  
  setupNodeEvents(on, config) {
      allureWriter(on, config); 
      return config;
    },
  },


  projectId: "sagdw6",

});