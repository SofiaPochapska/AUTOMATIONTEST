import { defineConfig } from "cypress";
 
export default defineConfig({
  e2e: {
    baseUrl: "https://theconnectedshop.com",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: false,
  },
});