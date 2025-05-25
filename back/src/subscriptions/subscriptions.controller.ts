import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscriptions.service';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.subscriptionService.createSubscription(
      createSubscriptionDto.serviceName,
      createSubscriptionDto.price,
      createSubscriptionDto.expiresAt,
    );
  }

  @Post(':id/members')
  async addMember(@Param('id') id: number, @Body() addMemberDto: AddMemberDto) {
    return this.subscriptionService.addMember(id, addMemberDto.userId);
  }

  @Delete(':id/members/:userId')
  async removeMember(@Param('id') id: number, @Param('userId') userId: number) {
    return this.subscriptionService.removeMember(id, userId);
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: number) {
    return this.subscriptionService.getMembers(id);
  }

  @Patch('deactivate')
  async deactivateExpiredSubscriptions() {
    return this.subscriptionService.deactivateExpiredSubscriptions();
  }
}
