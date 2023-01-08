import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, ValidationPipe } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { kafkaTopics } from '@tekana-ewallet/shared/topics';
import { CustomerService } from './customer.service';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController implements OnModuleInit {
    constructor(private readonly customerService: CustomerService, @Inject('CUSTOMER_SERVICE') private clientKafka:ClientKafka) {}

    @Post('register')
    createCustomer(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto){
        return this.customerService.createCustomer(createCustomerDto)
    }

    @Get(':id')
    getCustomer(@Param('id') id: string) {
        return this.customerService.getCustomer(id)
    }

    onModuleInit() {
        this.clientKafka.subscribeToResponseOf(kafkaTopics.createCustomer)
        this.clientKafka.subscribeToResponseOf(kafkaTopics.getCustomer)
    }
}
