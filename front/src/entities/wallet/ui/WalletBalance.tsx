import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/card';
import { DollarSign, Clock, Loader2 } from 'lucide-react';
import type { Wallet } from '../model/types';

interface WalletBalanceProps {
  wallet: Wallet | null;
  isLoading?: boolean;
}

export function WalletBalance({ wallet, isLoading }: WalletBalanceProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="flex items-center justify-center h-24">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center justify-center h-24">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Card className="flex-1">
        <CardHeader className="pb-2">
          <CardDescription>Current balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-2xl font-bold">
              {wallet?.balance?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || '0.00'}
            </span>
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
            <span className="text-2xl font-bold">
              {wallet?.pendingAmount?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || '0.00'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

