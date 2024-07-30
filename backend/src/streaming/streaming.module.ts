// import { Module } from '@nestjs/common';
// import { StreamingGateway } from './streaming.gateway';
// import { StreamingService } from './streaming.service';

// @Module({
//   providers: [StreamingGateway, StreamingService],
// })
// export class StreamingModule {}

import { Module } from '@nestjs/common';
import { StreamingGateway } from './streaming.gateway';
import { StreamingService } from './streaming.service';

@Module({
  providers: [StreamingGateway, StreamingService],
})
export class StreamingModule {}
