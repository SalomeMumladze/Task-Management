import { useAuth } from "@/auth/hooks/useAuth";
import { useWorkspace } from "@/workspaces/context/WorkspaceProvider";
import { useEffect, useState } from "react";
import { getWorkspacesApi } from "@/workspaces/api/workspaces.api";
import { rolePermissions } from "@/workspaces/utils/rolePermissions";
import type { ProjectMember } from "@/workspaces/types/members.types";
import type { Role } from "@/workspaces/types/members.types";

export const usePermissions = () => {
  const { user } = useAuth();
  const { projectId } = useWorkspace();

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!projectId || !user) return;

    let ignore = false;

    const load = async () => {
      setLoading(true);

      const data = await getWorkspacesApi(projectId);

      if (!ignore) {
        setMembers(data);
        setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [projectId, user]);

  const member = members.find((m) => m.userId === user?.id);

  const role: Role = member?.role ?? "viewer";

  return {
    role,
    loading,
    ...rolePermissions[role],
  };
};
