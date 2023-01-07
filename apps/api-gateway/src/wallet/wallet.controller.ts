import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController implements OnModuleInit {
    constructor(private readonly walletService: WalletService, @Inject('WALLET_SERVICE') private clientKafka: ClientKafka) {}

    @Get(':id')
    getWallet(@Param('id') id: string) {
        return this.walletService.getWallet(id)
    }

    onModuleInit() {
        this.clientKafka.subscribeToResponseOf(kafkaTopics.getWallet)
    }
}
