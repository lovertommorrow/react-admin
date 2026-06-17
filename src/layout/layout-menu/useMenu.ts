

import { useMemo } from "react";
import { findRootMenuByPath } from "./utils";
import { useAccessStore } from "@/stores/access";
import { translateMenus } from "./utils";
import { t } from "i18next";
import { removeTrailingSlash } from "@/router/utils/remove-trailing-slash";
import { useCurrentRoute } from "@/hooks/use-current-route";

export function useMenu() {
	const wholeMenus = useAccessStore(state => state.wholeMenus);
	const translatedMenus = translateMenus(wholeMenus, t);
	console.log(translatedMenus,'==translatedMenus==')

	const { pathname } = useCurrentRoute();

	const sideNavMenuKeyInSplitMode = useMemo(() => {
		const targetPath = removeTrailingSlash(pathname);

		const { rootMenuPath } = findRootMenuByPath(translatedMenus, targetPath);
		return rootMenuPath ?? "";
	}, [pathname, translatedMenus]);

		/* 混合菜单模式下需要拆分 menu 的 items */
	const splitSideNavItems = useMemo(
		() => {
			const foundMenu = translatedMenus.find(item => item?.key === sideNavMenuKeyInSplitMode);
			if (!foundMenu) {
			 	return [];
			}
			return foundMenu?.children ?? [foundMenu];
		},
		[sideNavMenuKeyInSplitMode, translatedMenus],
	);
	/**
	 * 侧边菜单
	 */
	const sideNavItems = useMemo(() => {
		return splitSideNavItems
	}, [splitSideNavItems]);


	return {
    sideNavItems
	};
}