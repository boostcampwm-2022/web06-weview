import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MODE } from "../constants/mode";

const queryClient = new QueryClient();

if (MODE.MOCK === import.meta.env.VITE_API_MODE) {
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
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
