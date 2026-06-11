import { useAuth } from "@/auth/hooks/useAuth";
import { usePermissions } from "@/members/hooks/usePermissions";

export const useMiddleware = () => {
  const { isAuthenticated } = useAuth();

  const permissions = usePermissions();

  const check = (middleware: string) => {
    switch (middleware) {
      case "auth":
        return isAuthenticated;

      case "view":
        return permissions.canView;

      case "create":
        return permissions.canCreate;

      case "edit":
        return permissions.canEdit;

      case "delete":
        return permissions.canDelete;

      default:
        return true;
    }
  };

  const checkAll = (middlewares: string[] = []) => {
    return middlewares.every(check);
  };

  return {
    check,
    checkAll,
  };
};
