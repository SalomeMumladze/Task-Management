import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/auth/storage";
import { P } from "./path";

export default function ProtectedRoute() {
  const token = authStorage.getToken();

  if (!token) {
    return <Navigate to={P.LOGIN} replace />;
  }

  return <Outlet />;
}
