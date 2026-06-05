import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "dashboard", element: <div>Dashboard Page</div> },
      { path: "projects", element: <div>Projects Page</div> },
    ],
  },
];

export default function AppRouter() {
  return useRoutes(routes);
}
