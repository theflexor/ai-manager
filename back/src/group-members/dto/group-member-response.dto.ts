import { ApiProperty } from '@nestjs/swagger';

export class GroupMemberResponseDto {
  @ApiProperty({ example: 12, description: 'ID записи участника' })
  id: number;

  @ApiProperty({ example: 5, description: 'ID пользователя' })
  userId: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email участника' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Имя участника',
    required: false,
  })
  fullName?: string;

  @ApiProperty({ example: false, description: 'Является ли админом' })
  isAdmin: boolean;

  @ApiProperty({
    example: '2024-06-20T12:00:00Z',
    description: 'Когда добавлен',
  })
  joinedAt: string;
}

