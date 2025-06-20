import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('subscription_members')
@Unique('unique_subscription_user', ['subscription', 'user'])
export class SubscriptionMember {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the subscription member',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => Subscription,
    description: 'The subscription this member belongs to',
  })
  @ManyToOne(() => Subscription, (subscription) => subscription.members, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @Index()
  subscription: Subscription;

  @ApiProperty({
    type: () => User,
    description: 'The user who is a member of the subscription',
  })
  @ManyToOne(() => User, (user) => user.subscriptionMembers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Index()
  user: User;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user is the owner of the subscription',
  })
  @Column({ default: false, name: 'is_owner' })
  isOwner: boolean;

  @ApiProperty({
    example: '2024-06-03T12:34:56.789Z',
    description: 'Date when the member was added',
  })
  @CreateDateColumn({ name: 'added_at' })
  addedAt: Date;
}
