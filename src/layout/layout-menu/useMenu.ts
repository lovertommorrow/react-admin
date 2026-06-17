

import { useMemo } from "react";
import { useAccessStore } from "@/stores/access";
import { translateMenus } from "./utils";
import { t } from "i18next";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";

export function useMenu() {
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const translatedMenus = translateMenus(wholeMenus, t);
	const navigate = useNavigate();
	/**
	 * 侧边菜单
	 */
	const sideNavItems = useMemo(() => {
		return translatedMenus
	}, [translatedMenus]);

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