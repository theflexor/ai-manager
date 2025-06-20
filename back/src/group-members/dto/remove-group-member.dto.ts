import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveGroupMemberDto {
  @ApiProperty({ example: 1, description: 'ID группы' })
  @IsNumber()
  groupId: number;

  @ApiProperty({ example: 5, description: 'ID пользователя' })
  @IsNumber()
  userId: number;
}
