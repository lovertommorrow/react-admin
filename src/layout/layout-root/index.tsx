import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../../components/pageError";
import AuthGuard from "../../router/guards/AuthGuard";

export default function LayoutRoot() {
  return (
    <ErrorBoundary fallbackRender={PageError}>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </ErrorBoundary>
  );
}
