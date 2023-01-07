import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@tekana-ewallet/shared/entities';
import { AllExceptionFilter } from '@tekana-ewallet/shared/filters';
import { CustomerModule } from '../customer/customer.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forFeature([Customer]),
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      cache: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.dbname"),
        entities: [Customer],
        migrations: ["dist/migrations/*.{ts,js}"],
        migrationsTableName: "migrations_history",
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
