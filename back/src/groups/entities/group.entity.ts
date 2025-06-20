import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number; // Уникальный идентификатор группы

  @Column({ length: 255 })
  name: string; // Название группы (например, "Семья", "Команда")

  @ManyToOne(() => User, (user) => user.groups, { onDelete: 'CASCADE' })
  owner: User; // Владелец группы

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  members: User[]; // Участники группы

  @OneToMany(() => Subscription, (subscription) => subscription.group, {
    nullable: true,
  })
  subscriptions: Subscription[]; // Подписки, которыми управляет группа

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date; // Дата создания группы

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date; // Дата последнего обновления группы
}
