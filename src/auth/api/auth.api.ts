import { apiGateway } from "@/shared/api/httpClient";
import type { RegisterRequest, User } from "../types/auth.types";

export const registerApi = async (
  payload: RegisterRequest,
): Promise<{ user: User; token: string }> => {
  const existing = await apiGateway.get<User[]>(
    `/users?email=${payload.email}`,
  );

  if (existing.data.length > 0) {
    throw new Error("Email already exists");
  }

  const response = await apiGateway.post<User>("/users", {
    ...payload,
    role: "member",
    createdAt: new Date().toISOString(),
  });

  const user = response.data;

  const token = `token_${user.id}_${Date.now()}`;

  return { user, token };
};
