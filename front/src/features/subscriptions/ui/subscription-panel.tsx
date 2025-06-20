import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { Subscription } from '@/shared/api/orval/models';
import { formatDate, getDaysUntil, getNextPaymentDate } from '@/shared/lib';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionPanel({ subscription }: SubscriptionCardProps) {
  const daysLeft = getDaysUntil(subscription.expiresAt);
  const nextPayment = getNextPaymentDate(subscription.expiresAt);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{subscription.serviceName}</CardTitle>
          <Badge variant={subscription.isActive ? 'default' : 'destructive'}>
            {subscription.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        {subscription.description && (
          <p className="text-sm text-muted-foreground">
            {subscription.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {subscription.price} {subscription.currency}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {subscription.members.length} members
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Next payment: {formatDate(nextPayment)}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Start: {formatDate(subscription.startsAt)}</span>
            <span>End: {formatDate(subscription.expiresAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

