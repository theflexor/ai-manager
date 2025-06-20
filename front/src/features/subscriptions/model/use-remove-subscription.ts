import { useSubscriptionDelete } from '@/entities/subscription/model/queries';
import { toast } from 'sonner';

export const useRemoveSubscription = () => {
  const { mutate, isPending } = useSubscriptionDelete();

  const edit = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Subscription successfully updated');
      },
      onError: () => {
        toast.error('Failed to update subscription');
      },
    });
  };

  return {
    edit,
    isPending,
  };
};

