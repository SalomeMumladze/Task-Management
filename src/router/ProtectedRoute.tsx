import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/auth/storage";

export default function ProtectedRoute() {
  const token = authStorage.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
