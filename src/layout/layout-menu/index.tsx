import type { MenuProps } from "antd";
import { Menu } from "antd";
import { cn } from "@/utils/cn";
import type { MenuItemType } from "./types";
// import { HomeOutlined, LockOutlined } from "@ant-design/icons";
import { usePreferences } from "@/hooks/use-preferences";
import { useMemo } from "react";

interface LayoutMenuProps {
  mode?: MenuProps["mode"];
  autoExpandCurrentMenu?: boolean;
  menus?: MenuItemType[];
  handleMenuClick?: MenuProps['onClick'];
}

const emptyArray: MenuItemType[] = [];
// export default function LayoutMenu({ menus = emptyArray }: LayoutMenuProps) {

export default function LayoutMenu({
  mode = "inline",
  menus = emptyArray,
  handleMenuClick
}: LayoutMenuProps) {
  const { sidebarCollapsed } = usePreferences();
  const menuInlineCollapsedProp = useMemo(() => {
    /* inlineCollapsed 只在 inline 模式可用 */
    if (mode === "inline") {
      return { inlineCollapsed: sidebarCollapsed };
    }
    return {};
  }, [mode, sidebarCollapsed]);
  const { sidebarTheme, isDark } = usePreferences();
  console.log("isDark", isDark, sidebarTheme);

  return (
    <Menu
      className={cn("!border-none min-w-0 flex-auto")}
      inlineIndent={16}
      inlineCollapsed={sidebarCollapsed}
      {...menuInlineCollapsedProp}
      style={{ height: "initial", width: "100%" }}
      mode={mode}
      theme={isDark ? "dark" : sidebarTheme}
      items={menus as MenuProps["items"]}
      onClick={handleMenuClick}
    />
  );
}
