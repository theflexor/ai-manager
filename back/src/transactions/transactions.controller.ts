import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types/request-with-user';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('wallet/transactions')
// @UseGuards(JwtGuard)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  // @Post('deposit')
  // async deposit(
  //   @Request() req,
  //   @Body() createTransactionDto: CreateTransactionDto,
  // ) {
  //   const { amount, description } = createTransactionDto;
  //   return this.transactionService.createTransaction(
  //     req.user,
  //     amount,
  //     TransactionType.DEPOSIT,
  //     description,
  //   );
  // }

  // @Post('withdraw')
  // async withdraw(
  //   @Request() req,
  //   @Body() createTransactionDto: CreateTransactionDto,
  // ) {
  //   const { amount, description } = createTransactionDto;
  //   return this.transactionService.createTransaction(
  //     req.user,
  //     amount,
  //     TransactionType.WITHDRAW,
  //     description,
  //   );
  // }

  @Get(
    ':id', // Assuming you want to get transactions for a specific user by their ID
  )
  @ApiOkResponse({
    description: 'Get user transactions by ID',
    isArray: true,
    type: Transaction,
  })
  async getTransactions(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ) {
    return this.transactionService.getUserTransactions(Number(id));
  }
}
