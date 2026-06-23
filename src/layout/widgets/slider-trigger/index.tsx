import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { sliderTriggerHeight } from "../../constants";
import { cn } from "@/utils/cn";
import { BasicButton } from "@/components/basicButton";
import { usePreferences } from "@/hooks/use-preferences";

interface SliderTriggerProps {
  className?: string;
}

export function SliderTrigger({ className }: SliderTriggerProps) {
  const { sidebarCollapsed, setPreferences, sidebarTheme } = usePreferences();

  return (
    <BasicButton
      type="text"
      style={{
        boxShadow: "0px -3px 5px 0 rgb(29, 35, 41, 0.05)",
        height: sliderTriggerHeight,
        width: "100%",
      }}
      icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setPreferences({ sidebarCollapsed: !sidebarCollapsed })}
      className={cn(
        "rounded-none",
        className,
        sidebarTheme === "dark"
          ? "border-t-[#303030]"
          : "border-t-colorBorderSecondary",
      )}
    />
  );
}
