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

@Controller('wallet')
// @UseGuards(JwtGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDto, @Req() req: RequestWithUser) {
    const userId = req.session['userId'];
    return this.walletService.deposit(userId, depositDto.amount);
  }

  @Get()
  async getBalance(@Req() req: RequestWithUser) {
    const userId = req.session['userId'];
    return this.walletService.getBalance(userId);
  }

  @Get('transactions')
  async getTransactions(@Req() req: RequestWithUser) {
    const userId = req.session['userId'];
    return this.walletService.getTransactions(userId);
  }
}
