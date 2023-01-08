import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '@tekana-ewallet/shared/entities';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    ClientsModule.register([
        {
          name: 'WALLET_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'wallet',
              brokers: ['kafka:9092'],
            },
            consumer: {
              groupId: 'wallet-consumer',
            },
          },
        },
      ]),
],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
