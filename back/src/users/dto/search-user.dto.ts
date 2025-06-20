import { ApiProperty } from '@nestjs/swagger';

export class SearchUserResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'User Email' })
  email: string;

  @ApiProperty({ example: true, description: 'Email Verified Status' })
  isEmailVerified: boolean;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'Profile Picture URL',
  })
  profilePicture: string;
}

