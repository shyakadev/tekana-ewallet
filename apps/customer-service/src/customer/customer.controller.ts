import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {constructor(private readonly customerService: CustomerService){}

@EventPattern(kafkaTopics.createCustomer)
createCustomer(@Payload(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    this.customerService.createCustomer(createCustomerDto)
}

async getCustomer(@Payload() customerId: string) {
    return await this.customerService.getCustomer(customerId)
}
}
