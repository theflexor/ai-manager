import { getWallet } from '@/shared/api/orval/wallet';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys
export const walletKeys = {
  all: ['wallet'] as const,
  detail: (id: string) => [...walletKeys.all, id] as const,
};

const walletApi = getWallet();

// Хук для получения данных кошелька
export const useWallet = () => {
  return useQuery({
    queryKey: walletKeys.detail('wallet'),
    queryFn: walletApi.walletControllerGetBalance,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Хук для пополнения кошелька
export const useDepositMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: walletApi.walletControllerDeposit,
    onSuccess: (data) => {
      queryClient.setQueryData(walletKeys.detail('wallet'), data);
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
    onError: (error) => {
      console.error('Deposit failed:', error);
    },
  });
};

// Хук для вывода средств
// export const useWithdrawMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: walletApi.withdraw,
//     onSuccess: (data) => {
//       // Обновляем кэш с новыми данными кошелька
//       queryClient.setQueryData(walletKeys.detail('current'), data.wallet);
//     },
//     onError: (error) => {
//       console.error('Withdraw failed:', error);
//     },
//   });
// };

// Хук для обновления данных кошелька
// export const useRefreshWallet = () => {
//   const queryClient = useQueryClient();

//   return () => {
//     queryClient.invalidateQueries({
//       queryKey: walletKeys.detail('current'),
//     });
//   };
// };

