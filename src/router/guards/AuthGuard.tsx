import { Navigate } from "react-router";
import { useAuthStore } from "../../stores/auth";

interface AuthGuardProps {
  children?: React.ReactNode;
}

// 认证守卫
export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
