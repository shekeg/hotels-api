import { SendMessageDto } from './dto/send-message.dto';
import { IGetChatListParams } from './interfaces/get-chat-list-params.interface';
import { ISupportRequestService } from './interfaces/support-request-service.interface';
import { Message } from './messages.schema';
import { SupportRequest } from './support-request.schema';

export class SupportRequestService implements ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    throw new Error('Method not implemented.');
  }
  sendMessage(data: SendMessageDto): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  getMessages(supportRequest: string): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
