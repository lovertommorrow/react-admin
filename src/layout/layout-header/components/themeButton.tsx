import { BasicButton } from "@/components/basicButton";
import { usePreferences } from "@/hooks/use-preferences";
import { toggleHtmlClass } from "@/utils/tools";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import type { ButtonProps } from "antd";
import { useEffect } from "react";
import { flushSync } from "react-dom";

export function ThemeButton({ ...restProps }: ButtonProps) {

  const { isDark, changeSiteTheme } = usePreferences();
  /* tailwind theme */
  useEffect(() => {
    if (isDark) {
      toggleHtmlClass("dark").add();
    }
    else {
      toggleHtmlClass("dark").remove();
    }
  }, [isDark]);

  const toggleTheme = (event: React.PointerEvent) => {
    const isAppearanceTransition = !!document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isAppearanceTransition || !event) {
      changeSiteTheme(isDark ? "light" : "dark");
      return;
    }
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const root = document.documentElement;
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        changeSiteTheme(isDark ? "light" : "dark");
      });
    });

    // ---- 执行裁剪动画，并等待动画完成后再移除样式 ----
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      const animation = root.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-in",
          fill: "forwards",
          pseudoElement: isDark
            ? "::view-transition-old(root)"   // 暗→亮：旧视图收缩
            : "::view-transition-new(root)",  // 亮→暗：新视图展开
        }
      );
      return animation.finished; // 关键：等待动画完成
    });
  };

  return (
    <BasicButton
      type="text"
      {...restProps}
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onPointerDown={(e) => {
        restProps?.onPointerDown?.(e);
        toggleTheme(e);
      }}
    />
  );
}