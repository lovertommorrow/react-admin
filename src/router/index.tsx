import { createBrowserRouter, Navigate } from "react-router";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import Exception404 from "../pages/exception/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/login",
        lazy: async () => {
          const { default: Component } = await import("../pages/login");
          return { Component };
        },
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/home",
        lazy: async () => {
          const { default: Component } = await import("../pages/home");
          return { Component };
        },
      },
    ],
  },
  {
    path: "*",
    element: <Exception404 />,
  },
]);

export default router;
