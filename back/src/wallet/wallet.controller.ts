import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DepositDto } from './dto/deposit.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/types/request-with-user';
import { Wallet } from './entities/wallet.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('wallet')
@UseGuards(JwtGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('deposit')
  @ApiResponse({ status: 200, type: Wallet })
  async deposit(
    @Body() depositDto: DepositDto,
    @Req() req: RequestWithUser,
  ): Promise<Wallet> {
    const userId = req.session['userId'];
    return this.walletService.deposit(Number(userId), depositDto.amount);
  }

  @Get()
  @ApiResponse({ status: 200, type: Wallet })
  async getBalance(@Req() req: RequestWithUser): Promise<Wallet> {
    const userId = req.session['userId'];
    console.log('123', userId);
    return this.walletService.getBalance(Number(userId));
  }

  @Get('transactions')
  async getTransactions(@Req() req: RequestWithUser) {
    const userId = +req.session['userId'];
    return this.walletService.getTransactions(userId);
  }
}
