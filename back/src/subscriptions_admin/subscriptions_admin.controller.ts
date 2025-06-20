import { Controller, Post, Body, Get, Param } from '@nestjs/common';
// import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionAdminService } from './subscriptions_admin.service';

@Controller('admin/subscriptions')
export class SubscriptionAdminController {
  constructor(private readonly subscriptionService: SubscriptionAdminService) {}

  /**
   * Создание новой подписки (администраторский эндпоинт)
   */
  @Post()
  async createSubscription(@Body() createSubscriptionDto: any) {
    return this.subscriptionService.createSubscription(
      createSubscriptionDto.serviceName,
      createSubscriptionDto.price,
      createSubscriptionDto.expiresAt,
    );
  }

  /**
   * Получение списка всех подписок
   */
  @Get()
  async getAllSubscriptions() {
    return this.subscriptionService.getAllSubscriptions();
  }

  /**
   * Получение информации о конкретной подписке
   */
  @Get(':id')
  async getSubscriptionById(@Param('id') id: number) {
    return this.subscriptionService.getSubscriptionById(id);
  }
}
