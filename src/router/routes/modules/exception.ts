import { ExceptionOutlined, MinusSquareOutlined, StopOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";
import { $t } from "@/i18n/t";
import Container from "@/layout/container";
import type { AppRouteRecordRaw } from "@/router/types";

const Error404 = lazy(() => import("@/pages/exception/404"));
const Error403 = lazy(() => import("@/pages/exception/403"));

const routes: AppRouteRecordRaw[] = [
	{
		path: "/exception",
		Component: Container,
		handle: {
			title: $t("common.menu.exception"),
			icon: createElement(ExceptionOutlined),
		},
		children: [
			{
				path: "/exception/404",
				Component: Error404,
				handle: {
					title: $t("common.menu.exception_404"),
					icon: createElement(MinusSquareOutlined),
				},
			},
			{
				path: "/exception/403",
				Component: Error403,
				handle: {
					title: $t("common.menu.exception_403"),
					icon: createElement(StopOutlined),
				},
			}
		],
	},
];

export default routes;
