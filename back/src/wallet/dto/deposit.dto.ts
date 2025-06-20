import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class DepositDto {
  @IsNumber()
  @Min(0.01)
  @ApiProperty({ example: 100, description: 'Amount to deposit' })
  amount: number;
}
