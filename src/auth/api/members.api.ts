import { apiGateway } from "@/shared/api/httpClient";

export interface InviteMemberPayload {
  projectId: number;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
}

export interface ProjectMember {
  id: number;
  projectId: number;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
}

export const inviteMemberApi = async (payload: InviteMemberPayload) => {
  const response = await apiGateway.post("/members", payload);
  return response.data;
};

export const getMembersApi = async (projectId: number) => {
  const res = await apiGateway.get(`/members?projectId=${projectId}`);
  return res.data;
};

export const removeMemberApi = async (id: number) => {
  const res = await apiGateway.delete(`/members/${id}`);
  return res.data;
};
