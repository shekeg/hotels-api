import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() wss: Server;

  @SubscribeMessage('subscribeToChat')
  handleMessage(client: Socket, payload: { chatId: string }): void {
    this.wss.to(payload.chatId).emit('subscribeToChat', payload);
  }
}
