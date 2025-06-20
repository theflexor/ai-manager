'use client';

import { useSubscriptionById } from '@/entities/subscription/model/queries';
import { InviteForm } from '@/features/subscription-member/ui/invite-member-form';
import {} from '@/shared/api/orval/models';
import { GroupMembers } from '@/widgets/subscription/ui/members-list';
import { SubscriptionWidget } from '@/widgets/subscription/ui/subscription-info';
import { useParams } from 'next/navigation';

export function SubscriptionPage() {
  const id = useParams<{ id: string }>()?.id;
  const { data: subscription, isLoading } = useSubscriptionById(Number(id));

  if (!subscription || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Manage Subscription</h1>
        <p className="text-muted-foreground">
          Here you can manage your subscription details and members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SubscriptionWidget />
          <GroupMembers />
        </div>

        <div className="space-y-8">
          {subscription.isOwner ? <InviteForm /> : null}
        </div>
      </div>
    </div>
  );
}

