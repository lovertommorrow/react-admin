import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../../stores/auth";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";

interface AuthGuardProps {
  children?: React.ReactNode;
}

// 认证守卫
export default function AuthGuard({ children }: AuthGuardProps) {
  // 从状态中获取认证状态
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { pathname, search } = useLocation();
  const getUserInfo = useUserStore(state => state.getUserInfo);
  console.log("AuthGuard", pathname, search);
  console.log("AuthGuard", isAuthenticated);

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

      console.log(results, '====');
      const hasError = results.some(result => result.status === "rejected");
      if (hasError) {
        return <Navigate to="/login" replace />;
      }
    }
    fetchUserInfo();
  }, [getUserInfo, isAuthenticated]);



  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
