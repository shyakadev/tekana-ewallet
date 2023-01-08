import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'wallet',
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'wallet-consumer'
        }
      }
    }
  )
  await app.listen();
}

bootstrap();
