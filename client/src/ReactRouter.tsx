import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCallback from "@/components/LoginCallback/LoginCallback";
import React from "react";
import Profile from "@/components/Profile/Profile";

const ReactRouter = (): React.ReactElement => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Profile />,
    },
    {
      path: "/redirect/github",
      element: <LoginCallback />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default ReactRouter;
