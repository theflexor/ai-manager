import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: {
    email: string;
    passwordHash?: string;
    salt?: string;
  }) {
    const user = this.userRepository.create({
      ...createUserDto,
      wallet: { balance: 0 },
    });
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  getProfile(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  searchByEmail(email: string) {
    return this.userRepository.find({
      where: { email: ILike(`%${email}%`) },
      take: 10,
      select: ['email', 'id', 'isEmailVerified', 'profilePicture'],
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const response = await this.userRepository.update(id, updateUserDto);
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
