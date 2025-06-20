import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UserSession } from 'src/types/request-with-user';
import { GetSubscriptionDto } from './dto/get-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(
    createDto: CreateSubscriptionDto,
    user: UserSession,
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      ...createDto,
      userId: Number(user.userId),
      isActive: true,
      currency: createDto.currency || 'USD',
    });
    console.log(user.userId, 'userId from session');

    return this.subscriptionRepository.save(subscription);
  }

  async findOne(id: number, user: UserSession): Promise<GetSubscriptionDto> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: Number(id) },
      relations: ['user', 'members'],
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return {
      ...subscription,
      isOwner: subscription.userId === Number(user.userId) ? true : false,
    };
  }

  async findAll(): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { isActive: true },
      // relations: ['user', 'members'],
    });

    return subscriptions;
  }

  async update(
    id: string,
    updateDto: CreateSubscriptionDto,
    user: UserSession,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: Number(id), userId: Number(user.userId) },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.userId || subscription.userId !== Number(user.userId)) {
      throw new NotFoundException('You are not the owner of this subscription');
    }

    Object.assign(subscription, updateDto);
    return this.subscriptionRepository.save(subscription);
  }

  async remove(id: number, user: UserSession): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: Number(id) },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    await this.subscriptionRepository.remove(subscription);
  }
}
