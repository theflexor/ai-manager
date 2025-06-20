import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '@/shared/api/orval/models';
import { getSubscription } from '@/shared/api/orval/subscription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const subscriptionApi = getSubscription();

const queryKey = ['subscriptions'];

export function useSubscriptions() {
  return useQuery({
    queryKey,
    queryFn: async () => {
      console.log('Fetching subscriptions');
      return subscriptionApi.subscriptionControllerFindAll();
    },
  });
}

export function useSubscriptionById(id: number) {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => {
      console.log('Fetching subscription by ID:', id);
      return subscriptionApi.subscriptionControllerFindOne(id);
    },
    enabled: !!id, // Only run if id is provided
    staleTime: 0, // Disable caching
  });
}

export function useSubscriptionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateSubscriptionDto) => {
      console.log('Creating subscription with data:', data);
      return subscriptionApi.subscriptionControllerCreate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (error) => {
      console.error('Subscription creation failed:', error);
    },
  });
}

export function useSubscriptionUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSubscriptionDto;
    }) => {
      return subscriptionApi.subscriptionControllerUpdate(id, data);
    },
    onSuccess: () => {
      console.log('Subscription updated successfully');
      // Invalidate the subscriptions query to refresh the data
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
}

export function useSubscriptionDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      console.log('Deleting subscription with ID:', id);
      return subscriptionApi.subscriptionControllerRemove(id);
    },
    onSuccess: () => {
      console.log('Subscription deleted successfully');
      // Invalidate the subscriptions query to refresh the data
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (error) => {
      console.error('Subscription deletion failed:', error);
    },
  });
}

