import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubscriptionMember } from 'src/subscription-member/entities/subscription-member.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(
    () => SubscriptionMember,
    (subscriptionMember) => subscriptionMember.user,
  )
  subscriptionMembers: SubscriptionMember[]; // Это связь с участниками подписки
}
