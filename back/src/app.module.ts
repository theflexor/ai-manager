import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatMessage } from './chat_messages/entities/chat_message.entity';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { Group } from './groups/entities/group.entity';
import { GroupsModule } from './groups/groups.module';
import { Module } from '@nestjs/common';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { SubscriptionMember } from './subscription_members/entities/subscription_member.entity';
import { SubscriptionMembersModule } from './subscription_members/subscription_members.module';
import { SubscriptionsAdminModule } from './subscriptions_admin/subscriptions_admin.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Wallet } from './wallet/entities/wallet.entity';
import { WalletModule } from './wallet/wallet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GroupMembersModule } from './group-members/group-members.module';
import { GroupMember } from './group-members/entities/group_members.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          SubscriptionMember,
          Subscription,
          ChatMessage,
          User,
          Wallet,
          Transaction,
          Group,
          GroupMember,
        ],
        synchronize: true,
        // logging: true,
      }),
    }),
    UsersModule,
    WalletModule,
    SubscriptionsModule,
    SubscriptionMembersModule,
    AuthModule,
    TransactionsModule,
    ChatMessagesModule,
    SubscriptionMembersModule,
    GroupsModule,
    SubscriptionsAdminModule,
    GroupMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
