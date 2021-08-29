import { CreateSupportRequestDto } from '../dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';
import { Message } from '../messages.schema';
import { SupportRequest } from '../support-request.schema';

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
}
