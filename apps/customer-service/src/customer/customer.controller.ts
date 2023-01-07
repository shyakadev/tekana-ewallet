import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {constructor(private readonly customerService: CustomerService){}

@MessagePattern(kafkaTopics.createCustomer)
createCustomer(@Payload(ValidationPipe) createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto)
}

@MessagePattern(kafkaTopics.getCustomer)
async getCustomer(@Payload() customerId: string) {
    const customer = await this.customerService.getCustomer(customerId)
    return JSON.stringify(customer)
}
}
