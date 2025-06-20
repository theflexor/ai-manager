import { getTransactions } from '@/shared/api/orval/transactions';
import { useQuery } from '@tanstack/react-query';

export const transactionsQueryKey = ['transactions'] as const;

export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionsQueryKey,
    queryFn: () => getTransactions().transactionsControllerGetTransactions(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

