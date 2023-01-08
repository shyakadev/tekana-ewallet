import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { WalletService } from './wallet.service';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController implements OnModuleInit {
    constructor(private readonly walletService: WalletService, @Inject('WALLET_SERVICE') private clientKafka: ClientKafka) {}

    @Get(':customerId')
    getWallet(@Param('customerId') id: string) {
        return this.walletService.getWallet(id)
    }

    onModuleInit() {
        this.clientKafka.subscribeToResponseOf(kafkaTopics.getWallet)
    }
}
