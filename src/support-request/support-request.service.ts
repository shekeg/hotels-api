import { EventEmitter } from 'events';
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
  newMessageEmitter = new EventEmitter();

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

    const targetSupportRequest = await this.supportRequestModel.findById(
      data.supportRequest,
    );

    await targetSupportRequest.updateOne({
      $push: {
        messages: newMessage._id,
      },
    });

    const response = await this.messageModel
      .findById(messageDocument.id)
      .populate('author', 'name');

    this.newMessageEmitter.emit('newMessage', targetSupportRequest, response);

    return response;
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
    handler: (supportRequest: SupportRequestDocument, message: Message) => void,
  ): void {
    this.newMessageEmitter.on('newMessage', handler);
  }
}
