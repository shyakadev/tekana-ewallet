import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '@tekana-ewallet/shared/filters';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@tekana-ewallet/shared/entities';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    ClientsModule.register([
      {
        name: 'WALLET_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'customer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'wallet-consumer',
          },
        },
      },
    ]),
  ],
  providers: [CustomerService, {provide: APP_FILTER,
    useClass: AllExceptionFilter,}],
  controllers: [CustomerController]
})
export class CustomerModule {}
