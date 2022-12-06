import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import LoginCallback from "@/pages/LoginCallback/LoginCallback";
import Main from "@/pages/Main/Main";
import Post from "@/pages/Post/Post";

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
    {
      path: "/post/:postId",
      element: <Post />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default ReactRouter;
