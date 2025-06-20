import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useTransaction } from '../model/queries';
import { useAuthPayload } from '@/entities/user/model/utils';

export function TransactionHistory() {
  const { userId } = useAuthPayload();
  const { data, isLoading } = useTransaction(userId);

  if (isLoading || !data) {
    return 'loading...';
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>История транзакций</CardTitle>
        <CardDescription>Последние операции по вашему счету</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2 rounded-full',
                    transaction.type === 'deposit'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  )}
                >
                  {transaction.type === 'deposit' ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.createdAt}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    'font-medium',
                    transaction.type === 'deposit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {transaction.type === 'deposit' ? '+' : '-'}$
                  {transaction.amount}
                </p>
                {/* <p
                  className={cn(
                    'text-xs',
                    transaction.status === 'completed'
                      ? 'text-green-600'
                      : transaction.status === 'pending'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  )}
                >
                  {transaction.status === 'completed'
                    ? 'Завершено'
                    : transaction.status === 'pending'
                    ? 'В обработке'
                    : 'Ошибка'}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

