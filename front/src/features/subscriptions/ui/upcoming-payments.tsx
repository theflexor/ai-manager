'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { CalendarIcon } from 'lucide-react';

// Mock data for upcoming payments
const upcomingPayments = [
  {
    id: '1',
    name: 'ChatGPT Plus',
    amount: 20,
    date: 'May 15, 2025',
    logo: 'C',
    color: 'bg-green-500',
  },
  {
    id: '2',
    name: 'Midjourney',
    amount: 10,
    date: 'May 10, 2025',
    logo: 'M',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'Claude Pro',
    amount: 20,
    date: 'May 22, 2025',
    logo: 'C',
    color: 'bg-purple-500',
  },
  {
    id: '4',
    name: 'Stable Diffusion API',
    amount: 15,
    date: 'May 18, 2025',
    logo: 'S',
    color: 'bg-orange-500',
  },
];

export function UpcomingPayments() {
  return (
    <div className="space-y-4">
      {upcomingPayments.map((payment) => (
        <div key={payment.id} className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={`/placeholder.png`} alt={payment.name} />
            <AvatarFallback className={payment.color}>
              {payment.logo}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">${payment.amount}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            {payment.date}
          </div>
        </div>
      ))}
    </div>
  );
}

