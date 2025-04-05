import { getAuth } from '@/shared/api/orval/auth';
import { useQuery } from '@tanstack/react-query';

const sessionKey = ['session'];

const { authControllerGetSessionInfo } = getAuth();

export function useSessionQuery() {
  const data = useQuery({
    queryKey: sessionKey,
    queryFn: authControllerGetSessionInfo,
    staleTime: 5 * 60 * 1000,
  });
  return data;
}

