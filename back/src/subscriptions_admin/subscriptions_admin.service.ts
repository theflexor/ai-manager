import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionAdminService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}
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

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async getSubscriptionById(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }
}
