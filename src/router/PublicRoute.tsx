import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "@/shared/store/authStorage";
import { P } from "./path";

export default function PublicRoute() {
  const token = authStorage.getToken();

  if (token) {
    return <Navigate to={P.DASHBOARD.INDEX} replace />;
  }

  return <Outlet />;
}
