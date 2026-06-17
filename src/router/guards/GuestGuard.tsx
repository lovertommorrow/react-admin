import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/auth";

export default function GuestGuard() {
  const isLogin = useAuthStore((state) => state.token);

  if (isLogin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
