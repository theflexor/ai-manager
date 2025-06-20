import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../entities/subscription.entity';

export class GetSubscriptionDto extends Subscription {
  @ApiProperty({ example: false, description: 'Subscription owner' })
  isOwner?: boolean;
}

