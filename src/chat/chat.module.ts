import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestModule } from 'src/support-request/support-request.module';
import {
  SupportRequest,
  SupportRequestSchema,
} from 'src/support-request/support-request.schema';
import { ChatClientController } from './chat-client.controller';
import { ChatEmployeeController } from './chat-employee.controller';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    SupportRequestModule,
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  controllers: [ChatController, ChatClientController, ChatEmployeeController],
  providers: [ChatService],
})
export class ChatModule {}
