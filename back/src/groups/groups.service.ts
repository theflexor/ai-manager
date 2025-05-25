import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ name, ownerId }: CreateGroupDto): Promise<Group> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');

    const group = this.groupRepository.create({ name, owner });
    return this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find();
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }
}
