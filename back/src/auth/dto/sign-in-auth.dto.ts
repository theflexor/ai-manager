import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInAuth_DTO {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
