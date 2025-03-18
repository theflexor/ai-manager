import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('subscription_members')
export class SubscriptionMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Subscription, (subscription) => subscription.members, {
    onDelete: 'CASCADE',
  })
  subscription: Subscription; // Подписка, к которой принадлежит участник

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User; // Пользователь, который добавлен в подписку

  @Column({ default: false })
  isOwner: boolean; // Флаг, показывающий, является ли пользователь владельцем

  @CreateDateColumn()
  addedAt: Date; // Дата добавления участника
}
