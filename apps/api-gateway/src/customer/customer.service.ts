import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';

@Injectable()
export class CustomerService {
    constructor(@Inject('CUSTOMER_SERVICE') private readonly clientKafka: ClientKafka){}

    createCustomer(createCustomerDto: CreateCustomerDto) {
        return this.clientKafka.send(kafkaTopics.createCustomer, JSON.stringify(createCustomerDto))
    }

    getCustomer(id: string) {
        return this.clientKafka.send(kafkaTopics.getCustomer, id)
    }
}
