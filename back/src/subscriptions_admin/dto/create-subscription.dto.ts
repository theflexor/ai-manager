import { IsDate, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSubscriptionDto {
  @IsString()
  @ApiProperty({ example: 'Chat gpt' })
  serviceName: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 10 })
  price: number;

  @IsString()
  @ApiProperty({ example: 'Chat gpt description' })
  description?: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2023-10-10T00:00:00Z' })
  expiresAt: Date;
}
