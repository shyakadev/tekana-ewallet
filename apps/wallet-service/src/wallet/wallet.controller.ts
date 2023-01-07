import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WalletDto } from '@tekana-ewallet/shared/dto';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService){}

    @EventPattern(kafkaTopics.createWallet)
    createWallet(@Payload(ValidationPipe) walletDto: WalletDto) {
        this.walletService.createWallet(walletDto)
    }
}
