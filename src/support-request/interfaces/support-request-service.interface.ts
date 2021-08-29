import { SendMessageDto } from '../dto/send-message.dto';
import { Message } from '../messages.schema';
import { SupportRequest } from '../support-request.schema';
import { IGetChatListParams } from './get-chat-list-params.interface';

export interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}
