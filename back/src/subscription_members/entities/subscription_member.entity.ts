import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('subscription_members')
@Unique('unique_subscription_user', ['subscription', 'user'])
export class SubscriptionMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.members, {
    onDelete: 'CASCADE',
  })
  @Index()
  subscription: Subscription;

  @ManyToOne(() => User, (user) => user.subscriptionMembers, {
    onDelete: 'CASCADE',
  })
  @Index()
  user: User;

  @Column({ default: false, name: 'is_owner' })
  isOwner: boolean;

  @CreateDateColumn({ name: 'added_at' })
  addedAt: Date;
}
