

import { useMemo } from "react";
import { useAccessStore } from "@/stores/access";
import { translateMenus } from "./utils";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export function useMenu() {
	const t = useTranslation();
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const navigate = useNavigate();
	/**
	 * 侧边菜单
	 */
	const sideNavItems = useMemo(() => {
		return translateMenus(wholeMenus, t.t);
	}, [t, wholeMenus]);

	/**
	 * 菜单点击事件处理
	 */

	const handleClick: MenuProps['onClick'] = (e) => {
		navigate(e?.key);
	};

	return {
		sideNavItems,
		handleClick,
	};
}