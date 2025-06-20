import { PartialType } from '@nestjs/swagger';
import { AddSubscriptionMemberDto } from './create-subscription_member.dto';

export class UpdateSubscriptionMemberDto extends PartialType(
  AddSubscriptionMemberDto,
) {}
