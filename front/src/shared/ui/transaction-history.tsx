import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { cn } from '@/shared/lib/utils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export function TransactionHistory() {
  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: 'TX-1234',
      type: 'deposit',
      amount: 500,
      date: '2023-04-01',
      description: 'Пополнение счета',
      status: 'completed',
    },
    {
      id: 'TX-1235',
      type: 'withdrawal',
      amount: 150,
      date: '2023-03-28',
      description: 'Вывод средств',
      status: 'completed',
    },
    {
      id: 'TX-1236',
      type: 'deposit',
      amount: 1000,
      date: '2023-03-25',
      description: 'Пополнение счета',
      status: 'completed',
    },
    {
      id: 'TX-1237',
      type: 'withdrawal',
      amount: 250,
      date: '2023-03-20',
      description: 'Вывод средств',
      status: 'pending',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>История транзакций</CardTitle>
        <CardDescription>Последние операции по вашему счету</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                    {transaction.date}
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
                  {transaction.amount.toFixed(2)}
                </p>
                <p
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
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

