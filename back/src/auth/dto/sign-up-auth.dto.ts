import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignUpAuth_DTO {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password', description: 'Password' })
  password: string;
}
