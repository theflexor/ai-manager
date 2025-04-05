import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatMessage } from './chat_messages/entities/chat_message.entity';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { Module } from '@nestjs/common';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { SubscriptionMember } from './subscription_members/entities/subscription_member.entity';
import { SubscriptionMembersModule } from './subscription_members/subscription_members.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Wallet } from './wallet/entities/wallet.entity';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
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
          Subscription,
          User,
          SubscriptionMember,
          Wallet,
          ChatMessage,
          Transaction,
        ],
        synchronize: true,
        logging: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
