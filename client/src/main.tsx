import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { API_MODE } from "./constants/env";
import { MODE } from "./constants/mode";

if (MODE.MOCK === API_MODE) {
  import("@/mocks/browser")
    .then(async ({ worker }) => {
      await worker.start({
        onUnhandledRequest: "bypass",
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
