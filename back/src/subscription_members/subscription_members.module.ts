import { Module } from '@nestjs/common';
import { SubscriptionMember } from './entities/subscription_member.entity';
import { SubscriptionMembersController } from './subscription_members.controller';
import { SubscriptionMembersService } from './subscription_members.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionMember])],
  controllers: [SubscriptionMembersController],
  providers: [SubscriptionMembersService],
})
export class SubscriptionMembersModule {}
