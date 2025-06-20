import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'nurdanokenov@gmail.com' })
  email: string;

  @ApiProperty({ example: false })
  isEmailVerified: boolean;

  @ApiProperty({ example: '' })
  profilePicture: string;

  @ApiProperty({ example: 'nurdan okenov' })
  fullName: string;

  @ApiProperty({
    example: "I'm a software engineer with a passion for AI and фывфыв",
  })
  bio: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty({ example: null })
  preferences: any;

  @ApiProperty({ example: '2025-05-27T10:27:59.742Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-27T12:58:21.370Z' })
  updatedAt: string;
}

