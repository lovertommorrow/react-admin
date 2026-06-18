import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../../components/pageError";
import AuthGuard from "../../router/guards/AuthGuard";
import { useEffect } from "react";
import { toggleHtmlClass } from "@/utils/tools";

import { usePreferences } from "@/hooks/use-preferences";

export default function LayoutRoot() {
  const { isDark } = usePreferences();

  /* tailwind theme */
  useEffect(() => {
    if (isDark) {
      toggleHtmlClass("dark").add();
    }
    else {
      toggleHtmlClass("dark").remove();
    }
  }, [isDark]);

  return (
    <ErrorBoundary fallbackRender={PageError}>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </ErrorBoundary>
  );
}
