import { LockOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";
import { $t } from "@/i18n/t";
import { home } from "@/router/extra-info/order";
import Container from "@/layout/container";
import type { AppRouteRecordRaw } from "@/router/types";

const Permission = lazy(() => import("@/pages/permission"));
const routes: AppRouteRecordRaw[] = [
	{
		path: "/permission",
		Component: Container,
		handle: {
			order: home,
			title: $t("common.menu.access"),
			icon: createElement(LockOutlined),
		},
		children: [
			{
				index: true,
				Component: Permission,
				handle: {
					title: $t("common.menu.access"),
					icon: createElement(LockOutlined),
				},
			},
		],
	},
];

export default routes;
