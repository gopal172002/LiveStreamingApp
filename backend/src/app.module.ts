import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StreamingModule } from './streaming/streaming.module';
import { CustomConfigService } from './config/config.service';
import { LoggerService } from './common/logging/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Make config available globally
    StreamingModule,
  ],
  providers: [LoggerService, CustomConfigService],
})
export class AppModule {}
