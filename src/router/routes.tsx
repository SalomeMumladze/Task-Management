import { Navigate, useRoutes } from "react-router-dom";

import { Login } from "@/auth/pages/Login";
import { Register } from "@/auth/pages/Register";
import { UserSettings } from "@/auth/pages/UserSettings";

import AppLayout from "@/layout/AppLayout";

import { Middleware } from "./middleware";
import { P } from "./path";
import PublicRoute from "./PublicRoute";

const routes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: P.LOGIN,
        element: <Login />,
      },
      {
        path: P.REGISTER,
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Middleware middleware={["auth"]}>
        <AppLayout />
      </Middleware>
    ),
    children: [
      {
        path: P.DASHBOARD.INDEX,
        element: <div>Dashboard</div>,
      },

      {
        path: P.SETTINGS,
        element: (
          <Middleware middleware={["auth", "edit"]}>
            <UserSettings />
          </Middleware>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={P.LOGIN} replace />,
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
