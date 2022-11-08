import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      "cypress-react-selector": {
        root: "#root",
      },
    },
    baseUrl: "http://localhost:5173",
  },
});
