import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({})
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'fullname is required' })
  fullName: string;

  @ApiProperty({
    description: 'The bio of the user',
    example:
      "I'm a software engineer with a passion for AI and subscription management.",
  })
  @IsString({})
  bio: string;

  @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
  })
  @IsString({})
  profilePicture: string;
}
