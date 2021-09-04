import { MarkMessagesAsReadDto } from '../dto/mark-messages-as-read.dto';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}
