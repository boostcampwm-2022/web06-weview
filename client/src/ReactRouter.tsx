import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import LoginCallback from "@/pages/LoginCallback/LoginCallback";
import Main from "@/pages/Main/Main";

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
