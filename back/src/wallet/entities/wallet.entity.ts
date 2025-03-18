import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @OneToOne(() => User, (user) => user.wallet)
  user: User;
}
