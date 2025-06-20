import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ChatMessage } from 'src/chat_messages/entities/chat_message.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { GroupMember } from 'src/group-members/entities/group_members.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @Column({ length: 255, unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_pw', description: 'Password hash' })
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @ApiProperty({ example: 'random_salt', description: 'Salt' })
  @Column()
  salt: string;

  @ApiProperty({ example: true, description: 'Email verified' })
  @Column({ default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @ApiProperty({
    example: 'https://pic.url',
    description: 'Avatar URL',
    required: false,
  })
  @Column({ nullable: true, name: 'profile_picture' })
  profilePicture: string;

  @ApiProperty({ example: 'John Doe', description: 'Name', required: false })
  @Column({ length: 50, nullable: true })
  fullName: string;

  @ApiProperty({ example: 'Short bio', description: 'Bio', required: false })
  @Column({ length: 200, nullable: true })
  bio: string;

  @ApiProperty({ example: 'user', description: 'Role' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({
    example: { theme: 'dark' },
    description: 'Prefs',
    required: false,
  })
  @Column({ type: 'jsonb', nullable: true })
  preferences: any;

  @ApiProperty({ example: '2024-06-03T12:34:56Z', description: 'Created at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2024-06-04T12:00:00Z', description: 'Updated at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => Wallet, description: 'Wallet' })
  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @ApiProperty({
    type: () => [Subscription],
    description: 'Owner of subscriptions',
  })
  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @ApiProperty({
    type: () => [SubscriptionMember],
    description: 'Member of subscriptions',
  })
  @OneToMany(() => SubscriptionMember, (member) => member.user)
  subscriptionMembers: SubscriptionMember[];

  @ApiProperty({ type: () => [Transaction], description: 'Transactions' })
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @ApiProperty({ type: () => [ChatMessage], description: 'Messages' })
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.user)
  chatMessages: ChatMessage[];

  @ApiProperty({ type: () => [Group], description: 'Owned groups' })
  @OneToMany(() => Group, (group) => group.owner)
  x;
  groups: Group[];

  @ApiProperty({ type: () => [Group], description: 'Joined groups' })
  @OneToMany(() => GroupMember, (gm) => gm.user)
  groupMemberships: GroupMember[];
}
