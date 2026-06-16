import type { MenuProps } from "antd";

/**
 * @zh 主题类型
 * @en Theme type
 */
export type ThemeType = "dark" | "light" | "auto";


export interface PreferencesState extends SidebarState {
	/**

	 * Current theme
	 * @default "auto"
	 */
	theme: ThemeType,
}

export interface SidebarState {
	/**
	 * 侧边栏是否可见
	 * @default true
	 */
	sidebarEnable?: boolean
	/**
	 * 侧边菜单宽度
	 * @default 210
	 */
	sidebarWidth: number
	/**
	 * 侧边菜单折叠宽度
	 * @default 56
	 */
	sideCollapsedWidth: number
	/**
	 * 侧边菜单折叠状态
	 * @default false
	 */
	sidebarCollapsed: boolean
	/**
	 * 侧边菜单是否折叠时，是否显示 title
	 * @default true
	 */
	sidebarCollapseShowTitle: boolean
	/**
	 * 侧边菜单折叠额外宽度
	 * @default 48
	 */
	sidebarExtraCollapsedWidth: number

	/**
	 * 侧边栏主题
	 * @default dark
	 */
	sidebarTheme: MenuProps["theme"]
}
