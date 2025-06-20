import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: 'The name of the group', minLength: 3 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'The ID of the user who owns this group' })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiProperty({
    description: 'An array of user IDs to include as initial members',
    type: [Number],
    required: false,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  memberIds?: number[];
}
