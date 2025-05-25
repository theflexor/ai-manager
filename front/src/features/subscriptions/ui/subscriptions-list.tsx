'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Share2, Trash2 } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: '1',
    name: 'ChatGPT Plus',
    provider: 'OpenAI',
    price: 20,
    billingCycle: 'Monthly',
    nextBillingDate: '2025-05-15',
    category: 'AI Assistant',
    shared: false,
  },
  {
    id: '2',
    name: 'Midjourney',
    provider: 'Midjourney Inc.',
    price: 10,
    billingCycle: 'Monthly',
    nextBillingDate: '2025-05-10',
    category: 'AI Image Generation',
    shared: true,
  },
  {
    id: '3',
    name: 'Claude Pro',
    provider: 'Anthropic',
    price: 20,
    billingCycle: 'Monthly',
    nextBillingDate: '2025-05-22',
    category: 'AI Assistant',
    shared: false,
  },
  {
    id: '4',
    name: 'Stable Diffusion API',
    provider: 'Stability AI',
    price: 15,
    billingCycle: 'Monthly',
    nextBillingDate: '2025-05-18',
    category: 'AI Image Generation',
    shared: true,
  },
];

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  const handleDelete = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    toast(`{
      title: 'Subscription deleted',
      description: 'The subscription has been removed from your account.',
    }`);
  };

  const handleShare = (id: string) => {
    toast(`{
      title: 'Share subscription',
      description: 'Sharing options will appear here.',
    }`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subscriptions.map((subscription) => (
        <Card key={subscription.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{subscription.name}</CardTitle>
                <CardDescription>{subscription.provider}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleShare(subscription.id)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(subscription.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="font-medium">${subscription.price}/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Next billing:
                </span>
                <span className="font-medium">
                  {subscription.nextBillingDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="outline">{subscription.category}</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {subscription.shared && (
              <Badge variant="secondary" className="ml-auto">
                Shared
              </Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

