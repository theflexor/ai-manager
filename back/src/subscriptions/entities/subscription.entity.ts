import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SubscriptionMember } from 'src/subscription-member/entities/subscription-member.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @OneToMany(
    () => SubscriptionMember,
    (subscriptionMember) => subscriptionMember.subscription,
  )
  members: SubscriptionMember[]; // Связь с участниками подписки

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
