import { useSubscriptionById } from '@/entities/subscription/model/queries';
import { SubscriptionPanel } from '@/features/subscriptions/ui/subscription-panel';
import { useParams } from 'next/navigation';

export function SubscriptionWidget() {
  const id = useParams<{ id: string }>()?.id;
  const { data: subscription, isLoading } = useSubscriptionById(Number(id));

  if (!subscription || isLoading) {
    return <div>Loading...</div>;
  }

  return <SubscriptionPanel subscription={subscription} />;
}

