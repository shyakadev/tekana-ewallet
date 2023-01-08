import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
imports: [
    ClientsModule.register([
        {
        name: 'WALLET_SERVICE',
        transport: Transport.KAFKA,
        options: {
            client: {
            clientId: 'wallet-gateway',
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
