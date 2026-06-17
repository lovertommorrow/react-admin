import type { AppRouteRecordRaw, RouteFileModule } from "../types";
import { ascending } from "../utils/ascending";
import { mergeRouteModules } from "../utils/merge-route-modules";
import { LOGIN_ROUTE } from "./constants";


// 路由文件
export const dynamicRouteFiles: RouteFileModule = import.meta.glob("./modules/**/*.ts", { eager: true });

export const dynamicRoutes: AppRouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

const baseRoutes = ascending([
  ...dynamicRoutes,
]);

const whiteRouteNames = [LOGIN_ROUTE];

export {
	baseRoutes,
  whiteRouteNames,
};

console.log("baseRoutes", baseRoutes);
