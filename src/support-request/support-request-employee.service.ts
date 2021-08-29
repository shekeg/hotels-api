import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISupportRequestEmployeeService } from './interfaces/support-request-employee-service.interface';
import { Message } from './messages.schema';

export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    throw new Error('Method not implemented.');
  }
  getUnreadCount(supportRequest: string): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
  closeRequest(supportRequest: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
