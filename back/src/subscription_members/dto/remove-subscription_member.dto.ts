import { ApiProperty } from '@nestjs/swagger';

export class RemoveSubscriptionMemberDto {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  userId: number;
}
