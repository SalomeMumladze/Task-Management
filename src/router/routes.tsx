import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import { P } from "@/router/path";
import ProtectedRoute from "@/router/ProtectedRoute";
import Login from "@/auth/pages/Login";
import { Register } from "@/auth/pages/Register";

export const routes: RouteObject[] = [
  {
    path: P.LOGIN,
    element: <Login />,
  },
  { path: P.REGISTER, element: <Register /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <div>Dashboard</div> },
          { path: "/projects", element: <div>Projects</div> },
        ],
      },
    ],
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
