import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import { P } from "@/router/path";

export const routes: RouteObject[] = [
  {
    path: P.LOGIN,
    element: <div>Login Page</div>,
  },
  {
    path: P.HOME,
    element: <AppLayout />,
    children: [
      { path: P.DASHBOARD.INDEX, element: <div>Dashboard Page</div> },
      { path: P.PROJECTS.INDEX, element: <div>Projects Page</div> },
    ],
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
