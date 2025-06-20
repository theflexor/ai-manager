import type { Metadata } from 'next';
import { AddSubscriptionButton } from '@/features/subscriptions/ui/add-subscription-button';
import { SubscriptionsList } from '@/widgets/subscription/ui/subscription-list';

export const metadata: Metadata = {
  title: 'Subscriptions - AI Subscription Manager',
  description: 'Manage your AI subscriptions',
};

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your personal AI subscriptions
          </p>
        </div>
        <AddSubscriptionButton />
      </div>
      <SubscriptionsList />
    </div>
  );
}

