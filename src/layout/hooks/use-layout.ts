import { usePreferencesStore } from "@/stores/preferences";

export function useLayout() {
	// LayoutType
	const sidebarWidth = usePreferencesStore(state => state.sidebarWidth);
	const sideCollapsedWidth = usePreferencesStore(state => state.sideCollapsedWidth);

	return {
		sidebarWidth,
		sideCollapsedWidth,
	};
}
