import { UpdateUserDto } from '@/shared/api/orval/models';
import { getUsers } from '@/shared/api/orval/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const sessionKey = ['user'];

const usersApi = getUsers();

export function useProfileQuery(id: string) {
  return useQuery({
    queryKey: sessionKey,
    queryFn: () => usersApi.usersControllerGetProfile(id),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersApi.usersControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionKey,
      });
    },
    onError: (error) => {
      console.error('Deposit failed:', error);
    },
  });
}

export function useSearchUsersByEmail(email: string) {
  return useQuery({
    queryKey: ['search-users', email],
    queryFn: () => usersApi.usersControllerSearchUsers({ q: email }),
    enabled: !!email,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

