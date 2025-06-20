'use client';

import type React from 'react';

import { useState } from 'react';
import { ArrowDownLeft } from 'lucide-react';
import { useDepositMutation } from '@/entities/wallet';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function DepositForm() {
  const [amount, setAmount] = useState('');
  const depositMutation = useDepositMutation();
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleDeposit = async () => {
    const numAmount = Number.parseFloat(amount);

    if (!amount || numAmount <= 0) return;

    // Валидация
    if (numAmount > 10000) {
      return;
    }

    try {
      await depositMutation.mutateAsync({ amount: numAmount });
      setAmount(''); // Очищаем форму после успешного пополнения
    } catch (error) {
      // Ошибка уже обработана в мутации
      console.error('Deposit failed:', error);
    }
  };

  const numAmount = Number.parseFloat(amount);
  const isInvalid = numAmount > 10000;
  const isValid = numAmount > 0 && numAmount <= 10000;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="deposit-amount">Amount</Label>
        <Input
          id="deposit-amount"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
          disabled={depositMutation.isPending}
          className={isInvalid ? 'border-red-500' : ''}
        />
        {isInvalid && (
          <p className="text-sm text-red-500">
            Maximum deposit amount is $10,000
          </p>
        )}
      </div>

      {/* {depositMutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {depositMutation.error instanceof Error ? depositMutation.error.message : "Deposit failed"}
          </AlertDescription>
        </Alert>
      )} */}
      {/* 
      {depositMutation.isSuccess && (
        <Alert className="border-green-500 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Deposit successful! Your wallet has been updated.</AlertDescription>
        </Alert>
      )} */}

      <Button
        className="w-full"
        onClick={handleDeposit}
        disabled={depositMutation.isPending || !isValid}
      >
        <ArrowDownLeft className="mr-2 h-4 w-4" />
        {depositMutation.isPending ? 'Processing...' : 'Deposit Funds'}
      </Button>
    </div>
  );
}

