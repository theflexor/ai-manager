import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_members.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly groupMemberRepo: Repository<GroupMember>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async addUserToGroup(
    groupId: number,
    userId: number,
    isAdmin = false,
  ): Promise<GroupMember> {
    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!group) throw new NotFoundException('Group not found');
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.groupMemberRepo.findOne({
      where: { group: { id: groupId }, user: { id: userId } },
    });

    if (existing) return existing;

    const member = this.groupMemberRepo.create({ group, user, isAdmin });
    return this.groupMemberRepo.save(member);
  }

  async removeUserFromGroup(groupId: number, userId: number): Promise<void> {
    const result = await this.groupMemberRepo.delete({
      group: { id: groupId },
      user: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('User is not a member of the group');
    }
  }

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return this.groupMemberRepo.find({
      where: { group: { id: groupId } },
      relations: ['user'],
    });
  }

  async getUserGroups(userId: number): Promise<Group[]> {
    const memberships = await this.groupMemberRepo.find({
      where: { user: { id: userId } },
      relations: ['group'],
    });

    return memberships.map((m) => m.group);
  }

  async isUserInGroup(groupId: number, userId: number): Promise<boolean> {
    const exists = await this.groupMemberRepo.findOne({
      where: { group: { id: groupId }, user: { id: userId } },
    });

    return !!exists;
  }
}
