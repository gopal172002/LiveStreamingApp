// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { StreamingService } from './streaming.service';

// @WebSocketGateway()
// export class StreamingGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   constructor(private readonly streamingService: StreamingService) {}

//   handleConnection(client: any) {
//     console.log('Client connected:', client.id);
//   }

//   handleDisconnect(client: any) {
//     this.streamingService.removeStream(client.id);
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('stream')
//   handleStream(@MessageBody() data: any, client: any) {
//     this.streamingService.addStream(client.id, data);
//     this.server.emit('stream', { clientId: client.id, data });
//   }
// }

import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StreamingService } from './streaming.service';

@WebSocketGateway()
export class StreamingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly streamingService: StreamingService) {}

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    this.streamingService.removeStream(client.id);
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('stream')
  handleStream(@MessageBody() data: any, client: any) {
    this.streamingService.addStream(client.id, data);
    this.server.emit('stream', { clientId: client.id, data });
  }
}
