import { BasicButton } from "@/components/basicButton";
import { usePreferences } from "@/hooks/use-preferences";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";



export function ThemeButton({ ...restProps }) {
  const { isDark, changeSiteTheme } = usePreferences();
  const handleClick = () => {
    changeSiteTheme(isDark ? "light" : "dark");
  };

  return (
    <BasicButton
      {...restProps}
      type="text"
      icon={isDark ? <MoonOutlined /> : <SunOutlined />}
      onClick={handleClick}
    />
  )
}