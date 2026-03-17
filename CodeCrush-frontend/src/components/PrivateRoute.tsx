import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../app/store";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: ("parent" | "admin" | "child")[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const location = useLocation();

  const { isAuthenticated, user, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  // Not logged in
  if (!isAuthenticated || !user || !accessToken) {
    return <Navigate to="/parent/auth" state={{ from: location }} replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;