import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatMessages, { onDelete: 'CASCADE' })
  @Index()
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.chatMessages, {
    onDelete: 'CASCADE',
  })
  @Index()
  subscription: Subscription;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  response: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
