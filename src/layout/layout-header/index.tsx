import { theme as antdTheme, ConfigProvider, theme, type ButtonProps } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/languageSwitcher";
import { headerHeight } from "../constants";
import { UserMenu } from "./components/userMenu";
import { FullScreenButton } from "./components/fullScreenButton";
import { ThemeButton } from "./components/themeButton";
import { usePreferences } from "@/hooks/use-preferences";
import type { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  const { token: { Menu }, } = theme.useToken();
  const { t } = useTranslation();
  const { isDark, sidebarTheme } = usePreferences();

  const buttonProps: ButtonProps = {
    size: "medium",
    className: "px-[10px]",
  };
  const isFixedDarkTheme = isDark || (sidebarTheme === "dark");

  return (
    <ConfigProvider
      theme={{
        algorithm: isFixedDarkTheme
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <header
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
        style={{
          background: isFixedDarkTheme ? Menu?.darkItemBg : Menu?.itemBg,
          height: headerHeight
        }}

      >
        {children ?
          <div className="flex items-center grow h-full overflow-hidden">
            {children}
          </div> : <span className="font-medium">{t("common.header")}</span>
        }
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <LanguageSwitcher {...buttonProps} />
          <ThemeButton {...buttonProps} />
          <FullScreenButton target={document.documentElement} />
          <UserMenu {...buttonProps} />
        </div>
      </header>
    </ConfigProvider>
  );
}
