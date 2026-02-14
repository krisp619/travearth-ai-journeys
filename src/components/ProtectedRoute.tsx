import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";

export type TravearthRole = "admin" | "user" | "partner" | "guest";

type ProtectedRouteProps = {
  allowedRoles: TravearthRole[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = getCurrentUser();
  const role = user?.role ?? (typeof window !== "undefined" ? localStorage.getItem("travearth_role") : null);

  if (!role || !allowedRoles.includes(role as TravearthRole)) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
