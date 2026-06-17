import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../../stores/auth";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import { useAccessStore } from "@/stores/access";
import { baseRoutes, whiteRouteNames } from "../routes";
import { removeDuplicateRoutes } from "../utils/remove-duplicate-routes";
import { LOGIN_ROUTE } from "../routes/constants";

interface AuthGuardProps {
  children?: React.ReactNode;
}

// 认证守卫
export default function AuthGuard({ children }: AuthGuardProps) {
  // 从状态中获取认证状态
  const isLogin = useAuthStore((state) => state.token);
  const isAuthorized = useUserStore((state) => state.id);
  const { pathname } = useLocation();
  const getUserInfo = useUserStore(state => state.getUserInfo);
  const { setAccessStore } = useAccessStore();

  useEffect(() => {
    async function fetchUserInfo() {
      // 定义一个数组，用于存储所有需要等待的 Promise
      const promises = [];
      /*
       * Fetch user information
       */
      promises.push(getUserInfo());
      // 等待所有 Promise 完成
      const results = await Promise.allSettled(promises);
      const uniqueRoutes = removeDuplicateRoutes(baseRoutes);
      console.log(uniqueRoutes, '==uniqueRoutes==')
      setAccessStore(uniqueRoutes);
      const hasError = results.some(result => result.status === "rejected");
      if (hasError) {
        return <Navigate to="/login" replace />;
      }
    }

    if (!whiteRouteNames.includes(pathname) && isLogin && !isAuthorized) {
      fetchUserInfo();
    }
  }, [pathname, getUserInfo, isLogin, isAuthorized, setAccessStore]);

  if (!isLogin) {
    return pathname === LOGIN_ROUTE ? children : <Navigate to={LOGIN_ROUTE} replace />;
  }

  return children;
}
