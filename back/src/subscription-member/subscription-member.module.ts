import { Module } from '@nestjs/common';
import { SubscriptionMemberService } from './subscription-member.service';
import { SubscriptionMemberController } from './subscription-member.controller';

@Module({
  controllers: [SubscriptionMemberController],
  providers: [SubscriptionMemberService],
})
export class SubscriptionMemberModule {}
