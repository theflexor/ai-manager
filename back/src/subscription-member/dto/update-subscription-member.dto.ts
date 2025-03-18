import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionMemberDto } from './create-subscription-member.dto';

export class UpdateSubscriptionMemberDto extends PartialType(CreateSubscriptionMemberDto) {}
