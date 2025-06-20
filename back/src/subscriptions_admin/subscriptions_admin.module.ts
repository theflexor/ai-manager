import { Module } from '@nestjs/common';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionAdminController } from './subscriptions_admin.controller';
import { SubscriptionAdminService } from './subscriptions_admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionAdminController],
  providers: [SubscriptionAdminService],
})
export class SubscriptionsAdminModule {}
