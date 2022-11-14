import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCallback from "@/components/LoginCallback/LoginCallback";
import React from "react";
import Main from "@/pages/Main";

const ReactRouter = (): React.ReactElement => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/redirect/github",
      element: <LoginCallback />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default ReactRouter;
