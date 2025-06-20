import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChatMessage } from 'src/chat_messages/entities/chat_message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { User } from 'src/users/entities/user.entity';

import { ApiProperty } from '@nestjs/swagger';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB',
  UAH = 'UAH',
  KGS = 'KGS',
}

@Entity('subscriptions')
@Index('idx_subscriptions_expires_at', ['expiresAt'])
@Index('idx_subscriptions_user_id', ['userId'])
export class Subscription {
  @ApiProperty({ example: 1, description: 'Subscription ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 12,
    description: 'ID of the user who owns the subscription',
  })
  @Column()
  userId: number;

  @ApiProperty({
    type: () => User,
    description: 'The user who owns the subscription',
  })
  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    example: 'ChatGPT Plus',
    description: 'Name of the subscribed service',
  })
  @Column({ length: 255, name: 'service_name' })
  serviceName: string;

  @ApiProperty({ example: 20.0, description: 'Subscription price' })
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  price: number;

  @ApiProperty({
    example: 'USD',
    description: 'Currency of the subscription',
    enum: Currency,
    nullable: false,
    default: Currency.USD,
  })
  @Column({
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @ApiProperty({
    example: 'Access to GPT-4',
    required: false,
    description: 'Description of the subscription',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: '2025-12-01T00:00:00Z',
    description: 'Subscription expiration date',
  })
  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;

  @ApiProperty({
    example: '2025-06-01T00:00:00Z',
    description: 'Subscription start date',
  })
  @Column({ type: 'timestamp', name: 'starts_at' })
  startsAt: Date;

  @ApiProperty({ example: true, description: 'Is the subscription active' })
  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    example: 'personal',
    enum: ['personal', 'group', 'trial'],
    description: 'Type of the subscription',
  })
  @Column({
    type: 'enum',
    enum: ['personal', 'group', 'trial'],
    default: 'personal',
  })
  type: 'personal' | 'group' | 'trial';

  @ApiProperty({
    example: '2025-05-01T12:00:00Z',
    description: 'Creation date',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-10T12:00:00Z',
    description: 'Last update date',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    type: () => [SubscriptionMember],
    description: 'Members of the subscription',
  })
  @OneToMany(() => SubscriptionMember, (member) => member.subscription)
  members: SubscriptionMember[];

  @ApiProperty({
    type: () => [ChatMessage],
    description: 'Chat messages related to the subscription',
  })
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.subscription)
  chatMessages: ChatMessage[];

  @ApiProperty({
    type: () => Group,
    nullable: true,
    description: 'Group associated with the subscription (if any)',
  })
  @ManyToOne(() => Group, (group) => group.subscriptions, { nullable: true })
  group: Group;
}
