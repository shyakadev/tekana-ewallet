import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@tekana-ewallet/shared/filters';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@tekana-ewallet/shared/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer])
  ],
  providers: [CustomerService, {provide: APP_FILTER,
    useClass: AllExceptionFilter,}],
  controllers: [CustomerController]
})
export class CustomerModule {}
