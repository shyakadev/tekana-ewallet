import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletDto } from '@tekana-ewallet/shared/dto';
import { Wallet } from '@tekana-ewallet/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
    constructor(@InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>){}

    createWallet(walletDto: WalletDto) {
        this.walletRepository.save(walletDto)
        console.log(`Wallet successfully Created`)
    }

    async getWallet(customer: object): Promise<Partial<Wallet>> {
        try {
            const wallet = await this.walletRepository.findOne(customer)
            if(wallet) return wallet
            
            throw new RpcException(`Customer Id: ${customer} not found`)
        } catch (error) {
            Logger.error(error)
        }
    }
}
