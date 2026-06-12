import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  removeMemberApi,
  getWorkspacesApi,
  inviteMemberApi,
} from "@/workspaces/api/workspaces.api";

export const useMembers = (projectId: number) => {
  return useQuery({
    queryKey: ["members", projectId],
    queryFn: () => getWorkspacesApi(projectId),
  });
};

export const useInviteMember = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteMemberApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", projectId],
      });
    },
  });
};

export const useRemoveMember = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMemberApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", projectId],
      });
    },
  });
};
