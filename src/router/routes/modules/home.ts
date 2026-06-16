import { HomeOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";
import { $t } from "@/i18n/t";
import { home } from "@/router/extra-info/order";
import Container from "@/layout/container";
import type { AppRouteRecordRaw } from "@/router/types";

const Home = lazy(() => import("@/pages/home"));
const routes: AppRouteRecordRaw[] = [
	{
		path: "/home",
		Component: Container,
		handle: {
			order: home,
			title: $t("common.menu.home"),
			icon: createElement(HomeOutlined),
		},
		children: [
			{
				index: true,
				Component: Home,
				handle: {
					title: $t("common.menu.home"),
					icon: createElement(HomeOutlined),
				},
			},
		],
	},
];

export default routes;
