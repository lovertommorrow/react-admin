import { createHashRouter, type RouteObject } from "react-router";
import LayoutRoot from "@/layout/layout-root";
import { baseRoutes } from "./routes";
import { ROOT_ROUTE_ID } from "./routes/constants";

// import Container from "../layout/container";
// import { $t } from "../i18n/t";
// import { createElement } from "react";
// import { HomeOutlined } from "@ant-design/icons";

// const router = createHashRouter([
//   // {
//   //   Component: LayoutRoot,
//   //   children: [
//   //     {
//   //       path: "/home",
//   //       Component: Container,
//   //       handle: {
//   //         title: $t("common.menu.about"),
//   //         icon: createElement(HomeOutlined),
//   //       },
//   //       lazy: async () => {
//   //         const { default: Component } = await import("../pages/home");
//   //         return { Component };
//   //       },
//   //     },
//   //   ],
//   // },
//   {
//     path: "/",
//     element: <Navigate to="/login" replace />,
//   },
//   // {
//   //   path: "/home",
//   //   Component: Container,
//   //   handle: {
//   //     title: $t("common.menu.about"),
//   //     icon: createElement(HomeOutlined),
//   //   },
//   //   lazy: async () => {
//   //     const { default: Component } = await import("../pages/home");
//   //     return { Component };
//   //   },
//   // },
//   {
//     element: <GuestGuard />,
//     children: [
//       {
//         path: "/login",
//         lazy: async () => {
//           const { default: Component } = await import("@/pages/login");
//           return { Component };
//         },
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <Exception404 />,
//   },
// ]);

export const rootRoute: RouteObject[] = [
  {
    path: "/",
    id: ROOT_ROUTE_ID,
    Component: LayoutRoot,
    children: baseRoutes,
  },
];

function createRouter() {
  return createHashRouter(rootRoute);
}

export const router = createRouter();

export default router;
