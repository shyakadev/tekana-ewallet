import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
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

    @MessagePattern(kafkaTopics.getWallet)
    async getWallet(@Payload() customerId: string){
        const wallet = await this.walletService.getWallet({
            where: {customer: {id: customerId}}
        })
        return JSON.stringify(wallet)
    }
}
