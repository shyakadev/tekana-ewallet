import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from '../customer/customer.module';
import { WalletModule } from '../wallet/wallet.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/config';

@Module({
  imports: [CustomerModule, WalletModule, ConfigModule.forRoot({
    envFilePath: '../.env',
    isGlobal: true,
    cache: true,
    load: [config]
    
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
