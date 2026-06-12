import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/auth";

export default function GuestGuard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
