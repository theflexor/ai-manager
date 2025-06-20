import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity('transactions')
export class Transaction {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор транзакции',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 199.99,
    description: 'Сумма транзакции',
    type: 'number',
    format: 'decimal',
  })
  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount: number;

  @ApiProperty({
    example: 'INCOME',
    enum: TransactionType,
    description: 'Тип транзакции',
  })
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ApiProperty({
    example: 'Оплата подписки',
    description: 'Описание транзакции',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: '2024-05-28T12:34:56.789Z',
    description: 'Дата создания транзакции',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: () => Wallet,
    description: 'Кошелек, к которому относится транзакция',
  })
  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    onDelete: 'CASCADE',
  })
  wallet: Wallet;

  @ApiProperty({
    type: () => User,
    description: 'Пользователь, совершивший транзакцию',
  })
  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;
}
