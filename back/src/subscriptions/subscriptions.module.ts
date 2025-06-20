import { Module } from '@nestjs/common';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { SubscriptionTasksService } from './services/subscription-tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, SubscriptionMember, User, Group]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionTasksService],
})
export class SubscriptionsModule {}
