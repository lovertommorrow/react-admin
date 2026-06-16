import type { AppRouteRecordRaw, RouteFileModule } from "../types";
import { ascending } from "../utils/ascending";
import { mergeRouteModules } from "../utils/merge-route-modules";


// 路由文件
export const dynamicRouteFiles: RouteFileModule = import.meta.glob("./modules/**/*.ts", { eager: true });

export const dynamicRoutes: AppRouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles);

const baseRoutes = ascending([
  ...dynamicRoutes,
]);

export {
	baseRoutes,
};

console.log("baseRoutes", baseRoutes);
