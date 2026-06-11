import { useAuth } from "@/auth/hooks/useAuth";
import { useWorkspace } from "@/workpsace/WorkspaceProvider";
import { useEffect, useState } from "react";
import { getMembersApi } from "@/members/api/members.api";
import { rolePermissions } from "@/members/utils/rolePermissions";
import type { ProjectMember } from "@/members/types/members.types";

export const usePermissions = () => {
  const { user } = useAuth();
  const { projectId } = useWorkspace();

  const [members, setMembers] = useState<ProjectMember[]>([]);

  useEffect(() => {
    if (!projectId) return;

    getMembersApi(projectId).then(setMembers);
  }, [projectId]);

  const member = members.find((m) => m.userId === user?.id);

  const role = member?.role ?? "viewer";

  return rolePermissions[role];
};
