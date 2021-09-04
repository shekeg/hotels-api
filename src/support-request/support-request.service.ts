import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SendMessageDto } from './dto/send-message.dto';
import { IGetChatListParams } from './interfaces/get-chat-list-params.interface';
import { ISupportRequestService } from './interfaces/support-request-service.interface';
import { Message } from './messages.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './support-request.schema';

export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
  ) {}

  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel.find(params).exec();
  }

  sendMessage(data: SendMessageDto): Promise<Message> {
    return this.supportRequestModel
      .findById(data.supportRequest)
      .populate('messages')
      .exec()
      .then((supportRequestDocument) => {
        const newMessage: Message = {
          author: Types.ObjectId(data.author),
          sentAt: new Date(),
          text: data.text,
          readAt: null,
        };

        supportRequestDocument.messages = [
          ...supportRequestDocument.messages,
          newMessage,
        ];
        return supportRequestDocument.save();
      })
      .then((supportRequestDocument) => {
        const lastIndex = supportRequestDocument.messages.length - 1;
        const res = supportRequestDocument.messages[lastIndex];
        if (res instanceof Message) {
          return res;
        }
      });
  }

  getMessages(supportRequest: string): Promise<Message[]> {
    /*
    TODO: не забыть проверить автора в сообщениях 
      "author": {
        "id": string,
        "name": string
      }
    */
    return this.supportRequestModel
      .findById(supportRequest)
      .populate('messages', 'sentAt text readAt')
      .exec()
      .then((supportRequestDocument) => {
        return supportRequestDocument.messages as Message[];
      });
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
