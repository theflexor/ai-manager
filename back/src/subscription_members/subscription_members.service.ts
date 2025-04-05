import { Injectable } from '@nestjs/common';
import { CreateSubscriptionMemberDto } from './dto/create-subscription_member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription_member.dto';

@Injectable()
export class SubscriptionMembersService {
  create(createSubscriptionMemberDto: CreateSubscriptionMemberDto) {
    return 'This action adds a new subscriptionMember';
  }

  findAll() {
    return `This action returns all subscriptionMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionMember`;
  }

  update(id: number, updateSubscriptionMemberDto: UpdateSubscriptionMemberDto) {
    return `This action updates a #${id} subscriptionMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionMember`;
  }
}
