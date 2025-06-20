'use client';

import { useState } from 'react';
import { walletApi } from '@/entities/wallet';

export const useWalletDeposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deposit = async (amount: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Валидация
      if (amount <= 0) {
        throw new Error('Сумма должна быть больше 0');
      }

      if (amount > 10000) {
        throw new Error('Максимальная сумма пополнения: $10,000');
      }

      // API запрос
      const updatedWallet = await walletApi.deposit(amount);

      return updatedWallet;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка пополнения кошелька';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    deposit,
    isLoading,
    error,
    clearError,
  };
};

