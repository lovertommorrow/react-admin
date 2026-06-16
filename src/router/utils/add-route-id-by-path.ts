import type { AppRouteRecordRaw } from "../types";

export function addRouteIdByPath(routes: AppRouteRecordRaw[], parentId = "") {
	return routes.map((route) => {
		// 如何是 index 路由，则 id 为父级路径 + "/"
		const newRoute = { ...route, id: route.index ? `${parentId}/` : route.path };

		if (newRoute.children && newRoute.children.length > 0) {
			newRoute.children = addRouteIdByPath(newRoute.children, route.path);
		}

		return newRoute;
	});
}
