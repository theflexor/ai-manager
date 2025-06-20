import { Badge } from './badge';

interface StatusBadgeProps {
  isEmailVerified: boolean;
  isOwner?: boolean;
}

export function StatusBadge({ isEmailVerified, isOwner }: StatusBadgeProps) {
  if (isOwner) {
    return <Badge variant="default">Владелец</Badge>;
  }

  return (
    <Badge variant={isEmailVerified ? 'default' : 'secondary'}>
      {isEmailVerified ? 'Подтвержден' : 'Не подтвержден'}
    </Badge>
  );
}

