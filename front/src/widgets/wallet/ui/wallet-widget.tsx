'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ArrowDownLeft, ArrowUpRight, Clock, DollarSign } from 'lucide-react';
import { TransactionHistory } from '@/entities/transaction';

export function WalletWidget() {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My wallet</CardTitle>
        <CardDescription>Manage your funds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>Current balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-2xl font-bold">12,345.67</span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>Pending transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-2xl font-bold">250.00</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposit">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="deposit">Refill</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Введите сумму"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <Button className="w-full">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Refill your wallet
            </Button>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Введите сумму"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <Button className="w-full" variant="outline">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Withdraw funds
            </Button>
          </TabsContent>
        </Tabs>

        <TransactionHistory />
      </CardContent>
    </Card>
  );
}

