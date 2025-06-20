import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscription.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class SubscriptionTasksService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async disableExpiredSubscriptions() {
    const now = new Date();

    const expired = await this.subscriptionRepository.find({
      where: {
        isActive: true,
        expiresAt: LessThan(now),
      },
    });

    for (const sub of expired) {
      sub.isActive = false;
      await this.subscriptionRepository.save(sub);
    }

    console.log(`✅ Завершено ${expired.length} подписок`);
  }
}

