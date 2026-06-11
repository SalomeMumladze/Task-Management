import { useAuth } from "@/auth/hooks/useAuth";
import { useWorkspace } from "@/workpsace/WorkspaceProvider";
import { useEffect, useState } from "react";
import { getMembersApi } from "@/members/api/members.api";
import { rolePermissions } from "@/members/utils/rolePermissions";
import type { ProjectMember } from "@/members/types/members.types";
import type { Role } from "@/members/types/members.types";

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

      const data = await getMembersApi(projectId);

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
