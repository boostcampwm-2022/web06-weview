import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import * as path from "path";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        vitePreprocessor(path.resolve(path.resolve(), "./vite.config.ts"))
      );
    },
    env: {
      "cypress-react-selector": {
        root: "#root",
      },
    },
    chromeWebSecurity: false,
    baseUrl: "http://localhost:5173",
  },
});
