import type { RouteObject } from "react-router-dom";
import { useRoutes, Navigate } from "react-router-dom";

import AppLayout from "@/layout/AppLayout";
import { P } from "@/router/path";

import ProtectedRoute from "@/router/ProtectedRoute";
import PublicRoute from "@/router/PublicRoute";

import { Login } from "@/auth/pages/Login";
import { Register } from "@/auth/pages/Register";
import { UserSettings } from "@/auth/pages/UserSettings";

export const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: P.LOGIN, element: <Login /> },
      { path: P.REGISTER, element: <Register /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <div>Dashboard</div> },
          { path: P.SETTINGS, element: <UserSettings /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
];

export default function AppRouter() {
  return useRoutes(routes);
}
