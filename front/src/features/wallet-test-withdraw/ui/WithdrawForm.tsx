'use client';

import type React from 'react';

import { useState } from 'react';

import { ArrowUpRight } from 'lucide-react';
// import { useWithdrawMutation, useWallet } from '@/entities/wallet';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function WithdrawForm() {
  // const [amount, setAmount] = useState('');
  // // const withdrawMutation = useWithdrawMutation();
  // // const { data: wallet } = useWallet();

  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/[^0-9.]/g, '');
  //   setAmount(value);
  // };

  // const handleWithdraw = async () => {
  //   const numAmount = Number.parseFloat(amount);

  //   if (!amount || numAmount <= 0) return;

  //   try {
  //     // await withdrawMutation.mutateAsync(numAmount);
  //     setAmount(''); // Очищаем форму после успешного вывода
  //   } catch (error) {
  //     // Ошибка уже обработана в мутации
  //     console.error('Withdraw failed:', error);
  //   }
  // };

  // const numAmount = Number.parseFloat(amount);
  // const maxAmount = wallet?.balance || 0;
  // const isInsufficientFunds = numAmount > maxAmount;
  // const isValid = numAmount > 0 && numAmount <= maxAmount;
  return 'withdawMutation';
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="withdraw-amount">Amount</Label>
        <Input
          id="withdraw-amount"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
          disabled={withdrawMutation.isPending}
          className={isInsufficientFunds ? 'border-red-500' : ''}
        />
        <p className="text-sm text-muted-foreground">
          Available: ${maxAmount.toFixed(2)}
        </p>
        {isInsufficientFunds && (
          <p className="text-sm text-red-500">Insufficient funds</p>
        )}
      </div>
      {/* 
      {withdrawMutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {withdrawMutation.error instanceof Error ? withdrawMutation.error.message : "Withdrawal failed"}
          </AlertDescription>
        </Alert>
      )} */}

      {/* {withdrawMutation.isSuccess && (
        <Alert className="border-green-500 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Withdrawal successful! Your wallet has been updated.</AlertDescription>
        </Alert>
      )} */}

      <Button
        className="w-full"
        variant="outline"
        onClick={handleWithdraw}
        disabled={withdrawMutation.isPending || !isValid}
      >
        <ArrowUpRight className="mr-2 h-4 w-4" />
        {withdrawMutation.isPending ? 'Processing...' : 'Withdraw Funds'}
      </Button>
    </div>
  );
}

