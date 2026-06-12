import { apiGateway } from "@/shared/api/httpClient";
import type { ProjectMember, Role } from "@/workspaces/types/members.types";

export interface InviteMemberPayload {
  projectId: number;
  email: string;
  role: Role;
}

export const inviteMemberApi = async (
  payload: InviteMemberPayload,
): Promise<ProjectMember> => {
  const res = await apiGateway.post<ProjectMember>("/members", payload);

  return res.data;
};

export const getWorkspacesApi = async (
  projectId: number,
): Promise<ProjectMember[]> => {
  const res = await apiGateway.get<ProjectMember[]>(
    `/members?projectId=${projectId}`,
  );

  return res.data;
};

export const removeMemberApi = async (id: string): Promise<void> => {
  await apiGateway.delete(`/members/${id}`);
};
