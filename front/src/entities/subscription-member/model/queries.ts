import { getSubscriptionMembers } from '@/shared/api/orval/subscription-members';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const queryKey = ['subscription-members'];

export const useSubscriptionMembersQuery = (subscriptionId: number) => {
  return useQuery({
    queryKey: [...queryKey, subscriptionId],
    queryFn: () =>
      getSubscriptionMembers().subscriptionMembersControllerFindAll(
        subscriptionId
      ),
    enabled: !!subscriptionId,
  });
};

export const useAddSubscriptionMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      subscriptionId,
      userId,
    }: {
      subscriptionId: number;
      userId: number;
    }) =>
      getSubscriptionMembers().subscriptionMembersControllerAddMember(
        subscriptionId,
        { userId: userId }
      ),
    onSuccess: () => {
      // Invalidate the query to refetch subscription members
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast.success('Member added successfully', {
        description: 'The member has been added to the subscription.',
      });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useRemoveSubscriptionMemberMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      subscriptionId,
      userId,
    }: {
      subscriptionId: number;
      userId: number;
    }) =>
      getSubscriptionMembers().subscriptionMembersControllerRemoveMember(
        subscriptionId,
        { userId: userId }
      ),
    onSuccess: () => {
      // Invalidate the query to refetch subscription members
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      toast.success('Member removed successfully', {
        description: 'The member has been removed from the subscription.',
      });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(error.response?.data?.message);
    },
  });
};

