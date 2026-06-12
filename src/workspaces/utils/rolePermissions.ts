import type { Permissions, Role } from "@/workspaces/types/members.types";

export const rolePermissions: Record<Role, Permissions> = {
  owner: { canView: true, canCreate: true, canEdit: true, canDelete: true },
  admin: { canView: true, canCreate: true, canEdit: true, canDelete: false },
  member: { canView: true, canCreate: true, canEdit: false, canDelete: false },
  viewer: { canView: true, canCreate: false, canEdit: false, canDelete: false },
};
