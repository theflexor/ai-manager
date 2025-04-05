import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionMemberDto } from './create-subscription_member.dto';

export class UpdateSubscriptionMemberDto extends PartialType(CreateSubscriptionMemberDto) {}
