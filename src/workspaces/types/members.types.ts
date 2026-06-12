export type Role = "owner" | "admin" | "member" | "viewer";

export interface Permissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface ProjectMember {
  id: string;
  projectId: number;
  userId: string;
  role: Role;
  name: string;
  surname: string;
  email: string;
}
