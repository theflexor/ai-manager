import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionType } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('wallet/transactions')
@UseGuards(JwtGuard)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('deposit')
  async deposit(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { amount, description } = createTransactionDto;
    return this.transactionService.createTransaction(
      req.user,
      amount,
      TransactionType.DEPOSIT,
      description,
    );
  }

  @Post('withdraw')
  async withdraw(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { amount, description } = createTransactionDto;
    return this.transactionService.createTransaction(
      req.user,
      amount,
      TransactionType.WITHDRAW,
      description,
    );
  }

  @Get()
  async getTransactions(@Request() req) {
    return this.transactionService.getUserTransactions(req.user);
  }
}
