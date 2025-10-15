import { defineConfig } from "cypress";
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  e2e: {
    baseUrl: process.env.WP_BASE_URL,
    screenshotOnRunFailure: true,
    env: {
      username: process.env.WP_USER,
      password: process.env.WP_PASSWORD,
    },
 
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: 'cypress/support/e2e.ts',
  },

  projectId: "sagdw6",

});
