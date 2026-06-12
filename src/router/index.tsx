import { createHashRouter, Navigate } from "react-router";
import GuestGuard from "./guards/GuestGuard";
import Exception404 from "../pages/exception/404";

// import Container from "../layout/container";
// import { $t } from "../i18n/t";
// import { createElement } from "react";
// import { HomeOutlined } from "@ant-design/icons";

const router = createHashRouter([
  // {
  //   Component: LayoutRoot,
  //   children: [
  //     {
  //       path: "/home",
  //       Component: Container,
  //       handle: {
  //         title: $t("common.menu.about"),
  //         icon: createElement(HomeOutlined),
  //       },
  //       lazy: async () => {
  //         const { default: Component } = await import("../pages/home");
  //         return { Component };
  //       },
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  // {
  //   path: "/home",
  //   Component: Container,
  //   handle: {
  //     title: $t("common.menu.about"),
  //     icon: createElement(HomeOutlined),
  //   },
  //   lazy: async () => {
  //     const { default: Component } = await import("../pages/home");
  //     return { Component };
  //   },
  // },
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
    path: "*",
    element: <Exception404 />,
  },
]);

export default router;
