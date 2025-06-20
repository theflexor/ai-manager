import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { SearchUserResponseDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  @ApiOkResponse({
    description: 'search users',
    type: [SearchUserResponseDto],
  })
  async searchUsers(@Query('q') query: string) {
    return this.usersService.searchByEmail(query);
  }

  @Get('profile/:id')
  @ApiOkResponse({
    description: 'Get user profile by ID',
    type: GetUserDto,
  })
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
