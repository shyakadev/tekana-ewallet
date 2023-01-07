import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateCustomerDto } from '@tekana-ewallet/shared/dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('register')
    createCustomer(@Body(ValidationPipe) createCustomerDto: CreateCustomerDto){
        this.customerService.createCustomer(createCustomerDto)
    }
}
