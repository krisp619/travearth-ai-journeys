import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "@/lib/cookies";

type RequireRoleProps = {
  role: "admin" | "user" | "partner";
  children: ReactNode;
};

const RequireRole = ({ role, children }: RequireRoleProps) => {
  const location = useLocation();
  const currentRole = getCookie("travearth_role");

  if (!currentRole || currentRole !== role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default RequireRole;
