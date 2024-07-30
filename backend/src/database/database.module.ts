import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CustomConfigService  } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: CustomConfigService) => ({
        uri: configService.mongodbUri,
      }),
      inject: [CustomConfigService],
    }),
  ],
}) 
export class DatabaseModule {}
