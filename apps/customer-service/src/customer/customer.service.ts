import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { Customer } from '@tekana-ewallet/shared/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>){}

createCustomer(createCustomerDto: CreateCustomerDto): void {
    console.log(createCustomerDto)
    try {
        const customer = this.customerRepository.create(createCustomerDto)
        this.customerRepository.save(customer)
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
