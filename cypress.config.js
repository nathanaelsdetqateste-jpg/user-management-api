import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },

    env: {
      hideCredentials: true,
    },
    supportFile: path.resolve("tests/E2e/cypress/support/e2e.js"),
    specPattern: "tests/E2e/cypress/e2e/**/*.cy.js",
    baseUrl: "http://localhost:3000/users",
  },
});
