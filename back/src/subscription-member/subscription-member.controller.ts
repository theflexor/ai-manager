import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionMemberService } from './subscription-member.service';
import { CreateSubscriptionMemberDto } from './dto/create-subscription-member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription-member.dto';

@Controller('subscription-member')
export class SubscriptionMemberController {
  constructor(private readonly subscriptionMemberService: SubscriptionMemberService) {}

  @Post()
  create(@Body() createSubscriptionMemberDto: CreateSubscriptionMemberDto) {
    return this.subscriptionMemberService.create(createSubscriptionMemberDto);
  }

  @Get()
  findAll() {
    return this.subscriptionMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionMemberDto: UpdateSubscriptionMemberDto) {
    return this.subscriptionMemberService.update(+id, updateSubscriptionMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionMemberService.remove(+id);
  }
}
