import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { Currency } from '../entities/subscription.entity';

export class UpdateSubscriptionDto {
  @ApiProperty({ example: 'ChatGPT Plus' })
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'USD', enum: Currency })
  @IsEnum(Currency)
  @IsNotEmpty()
  currency: Currency;

  @ApiProperty({ example: 'Подписка на GPT-4', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-06-01T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startsAt: Date;

  @ApiProperty({ example: '2025-12-01T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @ApiProperty({ example: 'personal', enum: ['personal', 'group', 'trial'] })
  @IsEnum(['personal', 'group', 'trial'])
  @IsNotEmpty()
  type: 'personal' | 'group' | 'trial';
}
