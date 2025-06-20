import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('group_members_users')
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.members)
  group: Group;

  @ManyToOne(() => User, (user) => user.groupMemberships)
  user: User;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  joinedAt: Date;
}

