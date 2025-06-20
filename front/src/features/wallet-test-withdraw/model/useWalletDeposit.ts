'use client';

import { useState } from 'react';
import { walletApi } from '@/entities/wallet';

export const useWalletWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withdraw = async (amount: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Валидация
      if (amount <= 0) {
        throw new Error('Сумма должна быть больше 0');
      }

      if (amount > 5000) {
        throw new Error('Максимальная сумма вывода: $5,000');
      }

      // API запрос
      const updatedWallet = await walletApi.withdraw(amount);

      // Обновляем store

      return updatedWallet;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка вывода средств';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    withdraw,
    isLoading,
    error,
    clearError,
  };
};

