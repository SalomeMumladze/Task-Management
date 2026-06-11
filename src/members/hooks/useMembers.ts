import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  removeMemberApi,
  getMembersApi,
  inviteMemberApi,
} from "@/members/api/members.api";

export const useMembers = (projectId: number) => {
  return useQuery({
    queryKey: ["members", projectId],
    queryFn: () => getMembersApi(projectId),
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
