import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddSubscriptionMemberDto } from './dto/create-subscription_member.dto';
import { UpdateSubscriptionMemberDto } from './dto/update-subscription_member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionMember } from './entities/subscription_member.entity';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class SubscriptionMembersService {
  constructor(
    @InjectRepository(SubscriptionMember)
    private readonly subscriptionMemberRepository: Repository<SubscriptionMember>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>, // Assuming this is the correct repository for subscriptions
  ) {}

  findAll(id: number) {
    return this.subscriptionMemberRepository.find({
      where: { subscription: { id } },
      relations: ['user'],
    });
  }

  async addUserToSubscription(subscriptionId: number, userId: number) {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: subscriptionId, isActive: true },
    });
    console.log(
      `Checking subscription with ID ${subscriptionId} for user ${userId}`,
    );

    if (!subscription) {
      throw new NotFoundException('Subscription not found or inactive');
    }

    const exists = await this.subscriptionMemberRepository.findOne({
      where: {
        subscription: { id: subscriptionId },
        user: { id: userId },
      },
    });

    if (exists) {
      throw new ConflictException('user already exists in this subscription');
    }

    const newMember = this.subscriptionMemberRepository.create({
      subscription: { id: subscriptionId },
      user: { id: userId },
    });

    return this.subscriptionMemberRepository.save(newMember);
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionMember`;
  }

  update(id: number, updateSubscriptionMemberDto: UpdateSubscriptionMemberDto) {
    return `This action updates a #${id} subscriptionMember`;
  }

  async remove(memberId: number, ownerId: number) {
    const member = await this.subscriptionMemberRepository.findOne({
      where: { id: memberId },
      relations: ['subscription'],
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    console.log(member, 'Member details before removal');

    const subscription = await this.subscriptionsRepository.findOne({
      where: { id: member.subscription.id },
    });

    console.log(subscription);

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    console.log(subscription.userId, 'Owner ID of the subscription');
    console.log(ownerId, 'Provided owner ID');

    if (subscription.userId !== ownerId) {
      throw new ConflictException(
        'Only the owner can remove members from the subscription',
      );
    }

    await this.subscriptionMemberRepository.remove(member);
    return { message: 'Member removed successfully' };
  }
}
