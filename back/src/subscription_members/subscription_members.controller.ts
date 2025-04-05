import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionMembersService } from './subscription_members.service';
import { CreateSubscriptionMemberDto } from './dto/create-subscription_member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription_member.dto';

@Controller('subscription-members')
export class SubscriptionMembersController {
  constructor(private readonly subscriptionMembersService: SubscriptionMembersService) {}

  @Post()
  create(@Body() createSubscriptionMemberDto: CreateSubscriptionMemberDto) {
    return this.subscriptionMembersService.create(createSubscriptionMemberDto);
  }

  @Get()
  findAll() {
    return this.subscriptionMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionMemberDto: UpdateSubscriptionMemberDto) {
    return this.subscriptionMembersService.update(+id, updateSubscriptionMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionMembersService.remove(+id);
  }
}
