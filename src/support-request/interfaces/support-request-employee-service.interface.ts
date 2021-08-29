import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';
import { Message } from '../messages.schema';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<Message[]>;
  closeRequest(supportRequest: string): Promise<void>;
}
