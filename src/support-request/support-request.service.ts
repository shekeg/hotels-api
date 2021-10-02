import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendMessageDto } from './dto/send-message.dto';
import { IGetChatListParams } from './interfaces/get-chat-list-params.interface';
import { ISupportRequestService } from './interfaces/support-request-service.interface';
import { Message, MessageDocument } from './messages.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './support-request.schema';

export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel.find(params).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const newMessage = new this.messageModel({
      author: data.author,
      sentAt: new Date(),
      text: data.text,
      readAt: null,
    });

    const messageDocument = await newMessage.save();

    await this.supportRequestModel.findByIdAndUpdate(data.supportRequest, {
      $push: {
        messages: newMessage._id,
      },
    });

    return this.messageModel
      .findById(messageDocument.id)
      .populate('author', 'name');
  }

  getMessages(supportRequest: string): Promise<Message[]> {
    return this.supportRequestModel
      .findById(supportRequest)
      .populate({
        path: 'messages',
        select: 'sentAt text readAt',
        populate: { path: 'author', select: 'name' },
      })
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
