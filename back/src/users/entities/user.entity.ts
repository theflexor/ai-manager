import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ChatMessage } from 'src/chat_messages/entities/chat_message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  salt: string;

  @Column({ default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @Column({ nullable: true, name: 'profile_picture' })
  profilePicture: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Связь один к одному с кошельком (при удалении пользователя – кошелек удаляется)
  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  wallet: Wallet;

  // Один пользователь может иметь несколько подписок (как владелец)
  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  // Подписки, в которых пользователь является участником
  @OneToMany(() => SubscriptionMember, (member) => member.user)
  subscriptionMembers: SubscriptionMember[];

  // История транзакций
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  // Сообщения из чата
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
  chatMessages: ChatMessage[];

  // Группы, где пользователь является владельцем
  @OneToMany(() => Group, (group) => group.owner)
  groups: Group[];

  // Группы, где пользователь является участником
  @ManyToMany(() => Group, (group) => group.members)
  groupMemberships: Group[];
}
