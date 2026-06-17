import { Watermark } from "antd";
import LayoutHeader from "../layout-header";
import LayoutContent from "../layout-content";
import LayoutMenu from "../layout-menu";
import LayoutSidebar from "../layout-sidebar";
import { cn } from "@/utils/cn";
import { usePreferencesStore } from "@/stores/preferences";
import { useMemo } from "react";
import { useLayout } from "../hooks/use-layout";
import { useMenu } from "../layout-menu/useMenu";

export default function Container() {
  const { sideNavItems, handleClick } = useMenu();
  const { sidebarCollapsed } = usePreferencesStore();
  const { sidebarWidth, sideCollapsedWidth } = useLayout();

  // 计算 sidebar 宽度
  const computedSidebarWidth = useMemo(() => {
    const currentSidebarWidth = sidebarCollapsed
      ? sideCollapsedWidth
      : sidebarWidth;
    return currentSidebarWidth;
  }, [sidebarCollapsed, sideCollapsedWidth, sidebarWidth]);
  return (
    <Watermark>
      <section
        className={cn("transition-all flex flex-col h-screen")}
        style={{ paddingLeft: computedSidebarWidth }}
      >
        <LayoutHeader />
        <LayoutSidebar computedSidebarWidth={computedSidebarWidth}>
          <LayoutMenu menus={sideNavItems} handleMenuClick={handleClick} />
        </LayoutSidebar>

        <LayoutContent />
      </section>
    </Watermark>
  );
}
