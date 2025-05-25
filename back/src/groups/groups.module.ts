import { User } from 'src/users/entities/user.entity';
import { Group } from './entities/group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
