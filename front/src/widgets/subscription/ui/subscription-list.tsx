'use client';

import { toast } from 'sonner';
import { useSubscriptions } from '@/entities/subscription/model/queries';
import { SubscriptionCard } from '@/entities/subscription/ui/subscription-card';
import { useEditCard } from '@/features/subscriptions/model/use-edit-subscription-card';
import { AddSubscriptionModal } from '@/features/subscriptions';
import { useRemoveSubscription } from '@/features/subscriptions/model/use-remove-subscription';

export function SubscriptionsList() {
  const { isLoading, data } = useSubscriptions();
  const { edit, isPending } = useRemoveSubscription();
  const { close, isOpen, open, subscriptionId, setIsOpen } = useEditCard();

  const handleDelete = async (id: number) => {
    await edit(id);
  };

  const handleShare = (id: number) => {
    toast(`{
      title: 'Share subscription',
      description: 'Sharing options will appear here.',
    }`);
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((subscription) => (
        <SubscriptionCard
          key={subscription.id + subscription.serviceName}
          subscription={subscription}
          handleDelete={handleDelete}
          handleEdit={open}
          handleShare={handleShare}
        />
      ))}
      <AddSubscriptionModal
        isOpen={isOpen}
        subscriptionId={subscriptionId!}
        setIsOpen={setIsOpen}
        close={close}
      />
    </div>
  );
}

