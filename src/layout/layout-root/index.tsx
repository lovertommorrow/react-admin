import { Outlet, useLocation, useMatches } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../../components/pageError";
import AuthGuard from "../../router/guards/AuthGuard";
import { useEffect } from "react";
import { whiteRouteNames } from "@/router/routes";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useTranslation } from "react-i18next";
import { isString } from "@/utils/tools";
import type { AppRouteRecordRaw } from "@/router/types";

export default function LayoutRoot() {
  const matches = useMatches();
  const { t } = useTranslation();
  const location = useLocation();
  const isLogin = useAuthStore(state => Boolean(state.token));
  const isAuthorized = useUserStore(state => Boolean(state.id));
  // 监听路由变化，更新页面标题
  useEffect(() => {
    /**
     * authGuardDependencies is the dependency of useEffect that will request user information. If it's true,
     */
    const authGuardDependencies = !whiteRouteNames.includes(location.pathname) && isLogin && !isAuthorized;
    if (!authGuardDependencies) {
      const currentRoute = matches[matches.length - 1] as AppRouteRecordRaw;
      const documentTitle = currentRoute.handle?.title as React.ReactElement<{ children: string }> | string;
      const newTitle = isString(documentTitle) ? documentTitle : documentTitle?.props?.children;
      document.title = t(newTitle) || document.title;
    }
  }, [isLogin, isAuthorized, location, t, matches]);

  return (
    <ErrorBoundary fallbackRender={PageError}>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </ErrorBoundary>
  );
}
