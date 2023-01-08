import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, WalletDto } from '@tekana-ewallet/shared/dto';
import { Customer } from '@tekana-ewallet/shared/entities';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>, @Inject('WALLET_SERVICE') private readonly clientKafka: ClientKafka
  ){}

async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
        const customer = await this.customerRepository.save(createCustomerDto)
        const walletDto = new WalletDto()
        walletDto.customer = customer

        if(customer) this.clientKafka.emit(kafkaTopics.createWallet, JSON.stringify(walletDto))

        return {message: `Customer ${customer.fullName} registered successfully with this Id: ${customer.id}`}
    } catch (error) {
        throw new RpcException(`${error}`)
    }
}

async getCustomer(id: string): Promise<Partial<Customer>> {
    try {
      const customer = await this.customerRepository.findOneBy({id})

      if(customer) return customer

      throw new RpcException(`Customer with id: ${id} not found`)
    } catch (error) {
      Logger.error(error)
    }
  }
}
