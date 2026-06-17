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
  handleMenuSelect?: (key: string, mode: MenuProps["mode"]) => void;
}
// import { useMenu } from "./useMenu";

// interface LayoutMenuProps {
//   menus?: MenuItemType[];
// }
const emptyArray: MenuItemType[] = [];
// export default function LayoutMenu({ menus = emptyArray }: LayoutMenuProps) {

export default function LayoutMenu({
  mode = "inline",
  menus = emptyArray,
}: LayoutMenuProps) {
  console.log(menus, "==menus==");

  const { sidebarCollapsed } = usePreferences();
  const menuInlineCollapsedProp = useMemo(() => {
    /* inlineCollapsed 只在 inline 模式可用 */
    if (mode === "inline") {
      return { inlineCollapsed: sidebarCollapsed };
    }
    return {};
  }, [mode, sidebarCollapsed]);

  const { sidebarTheme, isDark } = usePreferences();
  // const sideNavItems = [
  //   {
  //     title: "首页",
  //     key: " 1",
  //     icon: <HomeOutlined />,
  //     path: "/home",
  //     label: "首页",
  //   },
  //   {
  //     title: "权限管理",
  //     key: "2",
  //     icon: <LockOutlined />,
  //     path: "/permission",
  //     label: "权限管理",
  //     children: [
  //       {
  //         title: "角色管理",
  //         key: "3",
  //         icon: <HomeOutlined />,
  //         path: "/role/role",
  //         label: "角色管理",
  //       },
  //       {
  //         title: "角色管理",
  //         key: "4",
  //         icon: <HomeOutlined />,
  //         path: "/role/role",
  //         label: "人员管理",
  //       },
  //     ],
  //   },
  // ];
  // console.log(sideNavItems);
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
    />
  );
}
