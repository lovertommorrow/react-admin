import { $t } from "@/i18n/t";
import type { AppRouteRecordRaw } from "@/router/types";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/login"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/login",
		Component: Login,
		handle: {
			hideInMenu: true,
			title: $t("authority.login"),
		},
	},
];
export default routes;
