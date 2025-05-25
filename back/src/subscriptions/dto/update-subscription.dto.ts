import { IsDate, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsString()
  @ApiProperty({ example: 'Chat gpt' })
  serviceName?: string;

  @IsNumber()
  @ApiProperty({ example: '10' })
  price?: number;

  @IsString()
  @ApiProperty({ example: 'desc' })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2023-10-10' })
  expiresAt?: Date;
}
