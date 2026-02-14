import { Navigate } from "react-router-dom";
import { getCookie } from "@/lib/cookies";

type RoleRedirectProps = {
  role: "admin" | "user" | "partner";
  to: string;
};

const RoleRedirect = ({ role, to }: RoleRedirectProps) => {
  const currentRole = getCookie("travearth_role");

  if (!currentRole || currentRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={to} replace />;
};

export default RoleRedirect;
