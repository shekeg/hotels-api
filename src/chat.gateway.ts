import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SupportRequestService } from './support-request/support-request.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage('subscribeToChat')
  handleMessage(client: Socket, payload: { supportRequest: string }): void {
    this.supportRequestService.subscribe((supportRequest, message) => {
      if (payload.supportRequest === supportRequest.id) {
        this.wss.emit('subscribeToChat', message);
      }
    });
  }
}
