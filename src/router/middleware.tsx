import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/hooks/useAuth";
import { usePermissions } from "@/workspaces/hooks/usePermissions";

import { P } from "./path";

interface MiddlewareProps {
  middleware?: PermissionKey[];
  children: React.ReactNode;
}

type PermissionKey = "auth" | "view" | "create" | "edit" | "delete";

export const Middleware = ({ middleware = [], children }: MiddlewareProps) => {
  const { isAuthenticated } = useAuth();

  const permissions = usePermissions();

  if (permissions.loading) {
    return <div>Loading...</div>;
  }

  const guards: Record<PermissionKey, boolean> = {
    auth: isAuthenticated,
    view: permissions.canView,
    create: permissions.canCreate,
    edit: permissions.canEdit,
    delete: permissions.canDelete,
  };

  const hasAccess = middleware.every((rule) => guards[rule]);

  if (!hasAccess) {
    return <Navigate to={P.DASHBOARD.INDEX} replace />;
  }

  return <>{children}</>;
};
