import { createHashRouter, type RouteObject } from "react-router";
import LayoutRoot from "@/layout/layout-root";
import { baseRoutes } from "./routes";
import { ROOT_ROUTE_ID } from "./routes/constants";
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
