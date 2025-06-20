import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Wallet])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
