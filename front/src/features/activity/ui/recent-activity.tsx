'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

// Mock data for recent activity
const recentActivity = [
  {
    id: '1',
    user: 'John Doe',
    avatar: 'JD',
    action: 'added ChatGPT Plus to Family Plan',
    time: '2 hours ago',
  },
  {
    id: '2',
    user: 'Jane Smith',
    avatar: 'JS',
    action: 'joined Work Team',
    time: '5 hours ago',
  },
  {
    id: '3',
    user: 'Mike Johnson',
    avatar: 'MJ',
    action: 'updated subscription price for Midjourney',
    time: 'Yesterday',
  },
  {
    id: '4',
    user: 'Sarah Williams',
    avatar: 'SW',
    action: 'removed Netflix from Family Plan',
    time: '2 days ago',
  },
  {
    id: '5',
    user: 'John Doe',
    avatar: 'JD',
    action: 'created Friends group',
    time: '3 days ago',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={`/placeholder.png`} alt={activity.user} />
            <AvatarFallback>{activity.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  );
}

