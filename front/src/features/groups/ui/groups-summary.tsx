'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

// Mock data for groups summary
const groupsSummary = [
  {
    id: '1',
    name: 'Family Plan',
    members: 4,
    subscriptions: 3,
    totalSavings: 45,
    avatar: 'F',
    color: 'bg-green-500',
  },
  {
    id: '2',
    name: 'Work Team',
    members: 6,
    subscriptions: 5,
    totalSavings: 120,
    avatar: 'W',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'Friends',
    members: 3,
    subscriptions: 2,
    totalSavings: 25,
    avatar: 'F',
    color: 'bg-purple-500',
  },
];

export function GroupsSummary() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {groupsSummary.map((group) => (
        <div key={group.id} className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={`/placeholder.png`} alt={group.name} />
            <AvatarFallback className={group.color}>
              {group.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{group.name}</p>
            <p className="text-sm text-muted-foreground">
              {group.members} members, {group.subscriptions} subscriptions
            </p>
          </div>
          <div className="text-sm font-medium text-green-600">
            ${group.totalSavings}/mo saved
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={() => router.push('/groups')}
      >
        View All Groups
      </Button>
    </div>
  );
}

