import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  async createTransaction(
    user: User,
    amount: number,
    type: TransactionType,
    description?: string,
  ): Promise<Transaction> {
    if (amount <= 0) {
      throw new BadRequestException('Сумма должна быть положительной');
    }

    const wallet = await this.walletRepo.findOneOrFail({
      where: { user: { id: user.id } },
    });

    if (type === TransactionType.WITHDRAW && wallet.balance < amount) {
      throw new BadRequestException('Недостаточно средств');
    }
    const transaction = this.transactionRepo.create({
      amount,
      type,
      description,
      wallet,
      user,
    });

    return this.transactionRepo.save(transaction);
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
