import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import LoginCallback from "@/components/LoginCallback/LoginCallback";
import React from "react";

const ReactRouter = (): React.ReactElement => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "",
      element: <LoginCallback />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default ReactRouter;
