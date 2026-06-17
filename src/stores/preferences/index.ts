import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAppNamespace } from "@/utils/getAppNameSpace";
import type { PreferencesState, ThemeType } from "./types";

/**
 * 默认偏好设置
 */
export const DEFAULT_PREFERENCES = {
	theme: "auto",
	themeRadius: 6,
	sidebarTheme: "light",
	themeColorPrimary: "#1677ff",
	sidebarWidth: 210,
	sideCollapsedWidth: 56,
	sidebarCollapsed: false,
	sidebarEnable: false,
	sidebarCollapseShowTitle: true,
	sidebarExtraCollapsedWidth: 48,
} satisfies PreferencesState;
/**
 * 偏好设置操作接口
*/
interface PreferencesAction {
	setPreferences: (partial: Partial<PreferencesState>) => void;
	changeSiteTheme: (theme: ThemeType) => void;
}
/**
 * 偏好设置状态管理
 */

export const usePreferencesStore = create<PreferencesState & PreferencesAction>()(
	persist((set) => ({
		...DEFAULT_PREFERENCES,
		/**
		* 更新偏好设置
		*/
		setPreferences: (partial) => set((state) => ({ ...state, ...partial })),
		/**
		* 更新站点主题
		*/
		changeSiteTheme: (theme) => set((state) => ({ ...state, theme })),
	}), { name: getAppNamespace("preferences") })
);
