import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddGroupMemberDto } from './dto/add-group-member.dto';
import { GroupMemberResponseDto } from './dto/group-member-response.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  @ApiBody({
    type: AddGroupMemberDto,
  })
  @ApiResponse({ type: GroupMemberResponseDto })
  addMember(@Body() dto: AddGroupMemberDto) {
    return this.groupMembersService.addUserToGroup(
      dto.groupId,
      dto.userId,
      dto.isAdmin,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Remove user from group' })
  removeMember(
    @Query('groupId') groupId: number,
    @Query('userId') userId: number,
  ) {
    return this.groupMembersService.removeUserFromGroup(
      Number(groupId),
      Number(userId),
    );
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: 'Get members of a group' })
  getGroupMembers(@Param('groupId') groupId: number) {
    return this.groupMembersService.getGroupMembers(Number(groupId));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get groups where user is a member' })
  getUserGroups(@Param('userId') userId: number) {
    return this.groupMembersService.getUserGroups(Number(userId));
  }
}
