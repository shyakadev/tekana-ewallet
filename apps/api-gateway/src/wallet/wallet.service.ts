import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';

@Injectable()
export class WalletService {
    constructor(@Inject('WALLET_SERVICE') private readonly clientKafka: ClientKafka){}

    getWallet(customerId: string) {
        return this.clientKafka.send(kafkaTopics.getWallet, customerId)
    }
}
