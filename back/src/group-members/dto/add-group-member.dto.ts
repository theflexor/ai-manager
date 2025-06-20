import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddGroupMemberDto {
  @ApiProperty({ example: 1, description: 'ID группы' })
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @ApiProperty({ example: 5, description: 'ID пользователя' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: false,
    description: 'Является ли админом',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}

