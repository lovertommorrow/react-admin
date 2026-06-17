import { BasicButton } from "@/components/basicButton";
import { usePreferences } from "@/hooks/use-preferences";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import type { ButtonProps } from "antd";
import { useEffect } from "react";
import { flushSync } from "react-dom";

const isBrowser = typeof window !== "undefined";
function injectViewTransitionStyles() {
  if (isBrowser) {
    const styleId = "theme-switch-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        html.stop-transition * {
          transition: none !important;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root),
        .dark::view-transition-new(root) {
          z-index: 999999999 !important;
        }
        ::view-transition-new(root),
        .dark::view-transition-old(root) {
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

export function ThemeButton({ ...restProps }: ButtonProps) {

  useEffect(() => {
    injectViewTransitionStyles();
  }, []);

  const { isDark, changeSiteTheme } = usePreferences();
  const toggleTheme = (event: React.PointerEvent) => {
    const isAppearanceTransition = !!document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isAppearanceTransition || !event) {
      changeSiteTheme(isDark ? "light" : "dark");
      return;
    }
    const x = event?.clientX || 0;
    const y = event?.clientY || 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ) + 200;
    //document.documentElement.style.setProperty('--vt-x', `${x}px`);
    //document.documentElement.style.setProperty('--vt-y', `${y}px`);
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        changeSiteTheme(isDark ? "light" : "dark");
      });
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-in",
          fill: "forwards",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
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
  )
}