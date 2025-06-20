import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscriptions.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Subscription } from './entities/subscription.entity';
import { RequestWithUser } from 'src/types/request-with-user';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { GetSubscriptionDto } from './dto/get-subscription.dto';

@Controller('subscriptions')
@UseGuards(JwtGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'create subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  async create(
    @Body() dto: CreateSubscriptionDto,
    @Request() req: RequestWithUser,
  ) {
    return this.subscriptionService.create(dto, req.session);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get subscription' })
  @ApiResponse({ status: 200, type: GetSubscriptionDto })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: number) {
    return this.subscriptionService.findOne(id, req.session);
  }

  @Get()
  @ApiOperation({ summary: 'get all subscriptions' })
  @ApiResponse({ status: 200, type: [Subscription] })
  async findAll(@Request() req: RequestWithUser) {
    return this.subscriptionService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update subscription' })
  @ApiResponse({ status: 200, type: Subscription })
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, dto, req.session);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete subscription' })
  @ApiResponse({ status: 200 })
  async remove(@Request() req: RequestWithUser, @Param('id') id: number) {
    return this.subscriptionService.remove(Number(id), req.session);
  }
}
