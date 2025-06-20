'use client';

import { RefreshCw } from 'lucide-react';

// Импорты из entities
import { useWallet, WalletCard } from '@/entities/wallet';
import { TransactionHistory } from '@/entities/transaction';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { DepositForm } from '@/features/wallet-test';
import { WithdrawForm } from '@/features/wallet-test-withdraw';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

export function WalletDashboard() {
  const { data: wallet, isLoading } = useWallet();

  const handleRefresh = () => {
    // refreshWallet();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Wallet</CardTitle>
            <CardDescription>
              Manage your funds and transactions
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ошибка загрузки */}
          {/* {isError && (
            <alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error instanceof Error ? error.message : "Failed to load wallet"}</AlertDescription>
            </alert>
          )} */}

          {/* Entity: Wallet Balance */}
          <WalletCard wallet={wallet!} isLoading={isLoading} />

          {/* Features: Deposit & Withdraw */}
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Add money to your wallet</CardDescription>
                </CardHeader>
                <CardContent>
                  <DepositForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>
                    Transfer money from your wallet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WithdrawForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Entity: Transaction History */}
          <TransactionHistory />
        </CardContent>
      </Card>
    </div>
  );
}

