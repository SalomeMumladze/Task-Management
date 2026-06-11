import { apiGateway } from "@/shared/api/httpClient";
import type { ProjectMember, Role } from "@/members/types/members.types";

export interface InviteMemberPayload {
  projectId: number;
  userId: string;
  role: Role;
}

export const inviteMemberApi = async (
  payload: InviteMemberPayload,
): Promise<ProjectMember> => {
  const res = await apiGateway.post<ProjectMember>("/members", payload);

  return res.data;
};

export const getMembersApi = async (
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
