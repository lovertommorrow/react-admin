import type { ButtonProps } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/languageSwitcher";
import { headerHeight } from "../constants";
import { UserMenu } from "./components/userMenu";
import { FullScreenButton } from "./components/fullScreenButton";
import { ThemeButton } from "./components/themeButton";

export default function Header() {
  const { t } = useTranslation();

  const buttonProps: ButtonProps = {
    size: "medium",
    className: "px-[10px]",
  };

  return (
    <header
      style={{ height: headerHeight }}
      className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
    >
      <span className="font-medium">{t("common.header")}</span>
      <div className="ml-auto flex shrink-0 items-center gap-3">
        <LanguageSwitcher {...buttonProps} />
        <ThemeButton {...buttonProps} />
        <FullScreenButton target={document.documentElement} />
        <UserMenu {...buttonProps} />
      </div>
    </header>
  );
}
