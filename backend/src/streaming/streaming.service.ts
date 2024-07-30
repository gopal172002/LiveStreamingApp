import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  private streams: { [key: string]: any } = {};

  addStream(clientId: string, streamData: any) {
    this.streams[clientId] = streamData;
  }

  removeStream(clientId: string) {
    delete this.streams[clientId];
  }

  getStream(clientId: string): any {
    return this.streams[clientId];
  }

  getAllStreams(): { [key: string]: any } {
    return this.streams;
  }
}
