import { apiGateway } from "@/shared/api/httpClient";

export const getAuthUserApi = async (id: number | string) => {
  const res = await apiGateway.get(`/users/${id}`);
  return res.data;
};

export const updateAuthUserApi = async (
  id: number | string,
  data: {
    name?: string;
    surname?: string;
    email?: string;
    avatar?: string;
    password?: string;
  },
) => {
  const res = await apiGateway.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteAuthUserApi = async (id: number | string) => {
  const res = await apiGateway.delete(`/users/${id}`);
  return res.data;
};
