export class CreateUserDto {
  //   @IsEmail({}, { message: 'Invalid email format' })
  //   @IsNotEmpty({ message: 'Email is required' })
  email: string;

  //   @IsString()
  //   @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
