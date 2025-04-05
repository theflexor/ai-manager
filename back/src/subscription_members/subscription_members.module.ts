import { Module } from '@nestjs/common';
import { SubscriptionMembersService } from './subscription_members.service';
import { SubscriptionMembersController } from './subscription_members.controller';

@Module({
  controllers: [SubscriptionMembersController],
  providers: [SubscriptionMembersService],
})
export class SubscriptionMembersModule {}
