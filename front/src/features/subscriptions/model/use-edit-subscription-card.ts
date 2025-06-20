import { useState } from 'react';

export const useEditCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const open = (id: number) => {
    setSubscriptionId(id);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSubscriptionId(null);
  };

  return {
    isOpen,
    subscriptionId,
    open,
    close,
    setIsOpen,
  };
};

