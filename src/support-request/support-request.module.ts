import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './messages.schema';
import { SupportRequestClientService } from './support-request-client.service';
import { SupportRequestEmployeeService } from './support-request-employee.service';
import { SupportRequest, SupportRequestSchema } from './support-request.schema';
import { SupportRequestService } from './support-request.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  // controllers: [HotelsController, HotelRoomsController],
  providers: [
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportRequestService,
  ],
})
export class HotelsModule {}
