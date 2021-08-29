import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISupportRequestClientService } from './interfaces/support-request-client-service.interface';
import { Message } from './messages.schema';
import { SupportRequest } from './support-request.schema';

export class SupportRequestClientService
  implements ISupportRequestClientService
{
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    throw new Error('Method not implemented.');
  }
  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    throw new Error('Method not implemented.');
  }
  getUnreadCount(supportRequest: string): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}
