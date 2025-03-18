import { Injectable } from '@nestjs/common';
import { CreateSubscriptionMemberDto } from './dto/create-subscription-member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription-member.dto';

@Injectable()
export class SubscriptionMemberService {
  create(createSubscriptionMemberDto: CreateSubscriptionMemberDto) {
    return 'This action adds a new subscriptionMember';
  }

  findAll() {
    return `This action returns all subscriptionMember`;
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
