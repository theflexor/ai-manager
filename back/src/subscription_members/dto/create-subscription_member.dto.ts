import { ApiProperty } from '@nestjs/swagger';

export class AddSubscriptionMemberDto {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  userId: number;
}
