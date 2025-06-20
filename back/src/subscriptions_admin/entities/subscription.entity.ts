import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChatMessage } from 'src/chat_messages/entities/chat_message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('subscriptions')
@Index('idx_subscriptions_expires_at', ['expiresAt'])
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  // Владелец подписки
  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 255, name: 'service_name' })
  serviceName: string;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
  })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Связь с участниками подписки
  @OneToMany(() => SubscriptionMember, (member) => member.subscription)
  members: SubscriptionMember[];

  // Сообщения из AI-чата, связанные с подпиской
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.subscription)
  chatMessages: ChatMessage[];

  @ManyToOne(() => Group, (group) => group.subscriptions, { nullable: true })
  group: Group;
}
