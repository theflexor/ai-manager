import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/card';
import { DollarSign, Clock, Loader2 } from 'lucide-react';
import { Wallet } from '../model/types';

interface WalletCardProps {
  wallet: Wallet | null;
  isLoading?: boolean;
}

export function WalletCard({ wallet, isLoading }: WalletCardProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardDescription>Current balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-muted-foreground">Loading...</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardDescription>Pending transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-muted-foreground">Loading...</span>
            </div>
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
              {wallet?.balance?.toFixed(2) || '0.00'}
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
              {wallet?.pendingAmount?.toFixed(2) || '0.00'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

