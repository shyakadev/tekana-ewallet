import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Wallet } from '@tekana-ewallet/shared/entities';
import { WalletModule } from '../wallet/wallet.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';

@Module({
  imports: [
    WalletModule,
    TypeOrmModule.forFeature([Wallet]),
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
        entities: [Wallet, Customer],
        migrations: ["dist/migrations/*.{ts,js}"],
        migrationsTableName: "migrations_history",
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
