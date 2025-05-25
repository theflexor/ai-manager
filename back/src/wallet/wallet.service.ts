import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import {
  Transaction,
  TransactionType,
} from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly transactionsService: TransactionsService, // Инжектим сервис!
  ) {}

  // 💳 Пополнение баланса
  async deposit(userId: string, amount: number): Promise<Wallet> {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
      relations: ['wallet'],
    });

    if (!user || !user.wallet) {
      throw new NotFoundException('Кошелек не найден');
    }

    user.wallet.balance += amount;
    await this.walletRepository.save(user.wallet);

    // Используем TransactionsService для создания транзакции
    const transaction = await this.transactionsService.createTransaction(
      user,
      amount,
      TransactionType.DEPOSIT,
    );

    if (!transaction) {
      throw new NotFoundException('Не удалось создать транзакцию');
    }

    return user.wallet;
  }

  // 📊 Получить текущий баланс
  async getBalance(userId: string): Promise<{ balance: number }> {
    const wallet = await this.walletRepository.findOne({
      where: { user: { id: +userId } },
    });

    if (!wallet) {
      throw new NotFoundException('Кошелек не найден');
    }

    return { balance: Number(wallet.balance) };
  }

  // 🧾 Получить историю транзакций
  async getTransactions(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { user: { id: +userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
