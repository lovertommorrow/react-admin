import { theme as antdTheme, ConfigProvider } from "antd";

import { headerHeight, sliderTriggerHeight } from "../constants";
import { Logo } from "../widgets/logo";
import { SliderTrigger } from "../widgets/slider-trigger";
import { usePreferences } from "@/hooks/use-preferences";
import { Scrollbar } from "@/components/scrollbar";

export interface LayoutSidebarProps {
  children?: React.ReactNode;
  computedSidebarWidth: number;
}

export default function LayoutSidebar({
  children,
  computedSidebarWidth,
}: LayoutSidebarProps) {
  const { sidebarCollapsed, sidebarTheme, isDark } = usePreferences();
  const {
    token: { Menu },
  } = antdTheme.useToken();

  const isFixedDarkTheme = isDark || sidebarTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isFixedDarkTheme
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <aside
        style={{
          width: computedSidebarWidth + 1,
          backgroundColor: isFixedDarkTheme ? Menu?.darkItemBg : Menu?.itemBg,
          boxShadow: "3px 0 5px 0 rgb(29, 35, 41, 0.05)",
        }}
        className="fixed top-0 bottom-0 left-0 transition-all"
      >
        <Logo sidebarCollapsed={sidebarCollapsed} />
        <div
          className="overflow-hidden"
          style={{
            height: `calc(100% - ${headerHeight}px - ${sliderTriggerHeight}px)`,
          }}
        >
          <Scrollbar>{children}</Scrollbar>
        </div>
        <SliderTrigger />
      </aside>
    </ConfigProvider>
  );
}
