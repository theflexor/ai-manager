'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';

// Mock data for group subscriptions
const mockGroupSubscriptions = {
  '1': [
    {
      id: '1',
      name: 'Netflix',
      price: 15,
      owner: 'John Doe',
      avatar: 'N',
      color: 'bg-red-500',
    },
    {
      id: '2',
      name: 'Spotify Family',
      price: 15,
      owner: 'Jane Smith',
      avatar: 'S',
      color: 'bg-green-500',
    },
    {
      id: '3',
      name: 'ChatGPT Plus',
      price: 20,
      owner: 'John Doe',
      avatar: 'C',
      color: 'bg-blue-500',
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Adobe Creative Cloud',
      price: 55,
      owner: 'John Doe',
      avatar: 'A',
      color: 'bg-red-500',
    },
    {
      id: '5',
      name: 'Figma',
      price: 15,
      owner: 'Alex Brown',
      avatar: 'F',
      color: 'bg-purple-500',
    },
    {
      id: '6',
      name: 'Midjourney',
      price: 10,
      owner: 'Emma Davis',
      avatar: 'M',
      color: 'bg-blue-500',
    },
    {
      id: '7',
      name: 'Notion',
      price: 8,
      owner: 'Ryan Wilson',
      avatar: 'N',
      color: 'bg-gray-500',
    },
    {
      id: '8',
      name: 'ChatGPT Team',
      price: 30,
      owner: 'John Doe',
      avatar: 'C',
      color: 'bg-green-500',
    },
  ],
  '3': [
    {
      id: '9',
      name: 'Disney+',
      price: 8,
      owner: 'John Doe',
      avatar: 'D',
      color: 'bg-blue-500',
    },
    {
      id: '10',
      name: 'YouTube Premium',
      price: 12,
      owner: 'Sophia Clark',
      avatar: 'Y',
      color: 'bg-red-500',
    },
  ],
};

// Mock data for personal subscriptions that can be added to the group
const mockPersonalSubscriptions = [
  { id: 'p1', name: 'ChatGPT Plus', price: 20 },
  { id: 'p2', name: 'Midjourney', price: 10 },
  { id: 'p3', name: 'Claude Pro', price: 20 },
  { id: 'p4', name: 'Stable Diffusion API', price: 15 },
];

interface GroupSubscriptionsProps {
  groupId: string;
}

export function GroupSubscriptions({ groupId }: GroupSubscriptionsProps) {
  const [subscriptions, setSubscriptions] = useState(
    mockGroupSubscriptions[groupId as keyof typeof mockGroupSubscriptions] || []
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState('');

  const handleRemoveSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    toast(`{
      title: 'Subscription removed',
      description: 'The subscription has been removed from the group.',
    }`);
  };

  const handleAddSubscription = () => {
    if (!selectedSubscription) return;

    const subscription = mockPersonalSubscriptions.find(
      (sub) => sub.id === selectedSubscription
    );
    if (!subscription) return;

    const newSubscription = {
      id: `g-${subscription.id}`,
      name: subscription.name,
      price: subscription.price,
      owner: 'John Doe',
      avatar: subscription.name.charAt(0),
      color: 'bg-purple-500',
    };

    setSubscriptions([...subscriptions, newSubscription]);

    toast(
      <div>
        title: Subscription added, description: `${subscription.name} has been
        added to the group.`,
      </div>
    );

    setSelectedSubscription('');
    setAddDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Subscriptions</CardTitle>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Subscription</DialogTitle>
              <DialogDescription>
                Add one of your personal subscriptions to this group.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="subscription">Select subscription</Label>
              <Select
                value={selectedSubscription}
                onValueChange={setSelectedSubscription}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a subscription" />
                </SelectTrigger>
                <SelectContent>
                  {mockPersonalSubscriptions.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name} (${sub.price}/mo)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleAddSubscription}>Add to Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.png`} />
                  <AvatarFallback className={subscription.color}>
                    {subscription.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{subscription.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Added by {subscription.owner}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">${subscription.price}/mo</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleRemoveSubscription(subscription.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

