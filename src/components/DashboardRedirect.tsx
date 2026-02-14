import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";

const DashboardRedirect = () => {
  const user = getCurrentUser();
  const role = user?.role ?? (typeof window !== "undefined" ? localStorage.getItem("travearth_role") : null);

  if (!role) return <Navigate to="/login" replace />;

  if (role === "guest") return <Navigate to="/plan" replace />;

  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "partner") return <Navigate to="/dashboard/partner" replace />;
  if (role === "user") return <Navigate to="/dashboard/user" replace />;

  return <Navigate to="/login" replace />;
};

export default DashboardRedirect;
