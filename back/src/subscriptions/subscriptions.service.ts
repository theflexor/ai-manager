import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionMember } from 'src/subscription_members/entities/subscription_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubscriptionMember)
    private readonly subscriptionMemberRepository: Repository<SubscriptionMember>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  /**
   * Создание новой подписки
   */
  async createSubscription(
    serviceName: string,
    price: number,
    expiresAt: Date,
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      serviceName,
      price,
      expiresAt,
      isActive: true,
    });
    return this.subscriptionRepository.save(subscription);
  }

  /**
   * Добавление участника в подписку
   */
  async addMember(subscriptionId: number, userId: number): Promise<SubscriptionMember> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!subscription) throw new NotFoundException('Subscription not found');
    if (!user) throw new NotFoundException('User not found');

    const existingMember = await this.subscriptionMemberRepository.findOne({
      where: { subscription: { id: subscriptionId }, user: { id: userId } },
    });

    if (existingMember) throw new NotFoundException('User is already a member of this subscription');

    const member = this.subscriptionMemberRepository.create({
      subscription,
      user,
      isOwner: false,
    });
    return this.subscriptionMemberRepository.save(member);
  }

  /**
   * Удаление участника из подписки
   */
  async removeMember(subscriptionId: number, userId: number): Promise<void> {
    const member = await this.subscriptionMemberRepository.findOne({
      where: { subscription: { id: subscriptionId }, user: { id: userId } },
    });

    if (!member) throw new NotFoundException('Member not found');

    await this.subscriptionMemberRepository.remove(member);
  }

  /**
   * Получение списка участников подписки
   */
  async getMembers(subscriptionId: number): Promise<SubscriptionMember[]> {
    const members = await this.subscriptionMemberRepository.find({
      where: { subscription: { id: subscriptionId } },
      relations: ['user'],
    });

    if (!members.length) throw new NotFoundException('No members found for this subscription');

    return members;
  }

  /**
   * Деактивация истекших подписок
   */
  async deactivateExpiredSubscriptions(): Promise<void> {
    const now = new Date();
    const expiredSubscriptions = await this.subscriptionRepository.find({
      where: { expiresAt: LessThan(now), isActive: true },
    });

    for (const subscription of expiredSubscriptions) {
      subscription.isActive = false;
      await this.subscriptionRepository.save(subscription);
    }
  }

  /**
   * Привязка подписки к группе
   */
  async attachToGroup(subscriptionId: number, groupId: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId } });
    const group = await this.groupRepository.findOne({ where: { id: groupId } });

    if (!subscription) throw new NotFoundException('Subscription not found');
    if (!group) throw new NotFoundException('Group not found');

    subscription.group = group;
    await this.subscriptionRepository.save(subscription);
  }
}