import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISearchSupportRequestParams } from './interfaces/search-support-request-params.interface';
import { ISupportRequestClientService } from './interfaces/support-request-client-service.interface';
import { Message, MessageDocument } from './messages.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './support-request.schema';

export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  searchSupportRequests(user: string, params: ISearchSupportRequestParams) {
    const queryFilter: FilterQuery<SupportRequestDocument> = {};

    if (user) {
      queryFilter.user = user;
    }

    if (params && params.isActive) {
      queryFilter.isActive = params.isActive;
    }

    return this.supportRequestModel
      .find(queryFilter, 'createdAt isActive')
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
  }

  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const createdMessage = new this.messageModel({
      author: data.user,
      text: data.text,
    });
    return createdMessage.save().then((res) => {
      const createdSupportRequest = new this.supportRequestModel({
        user: data.user,
        messages: [res._id],
        isActive: true,
      });

      return createdSupportRequest.save();
    });
  }

  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const filterQuery: FilterQuery<SupportRequestDocument> = {};

    if (params.user) {
      filterQuery.user = params.user;
    }

    if (params.supportRequest) {
      filterQuery._id = params.supportRequest;
    }

    return this.supportRequestModel
      .findById(filterQuery._id)
      .exec()
      .then((supportRequestDocument) => {
        return this.messageModel.updateMany(
          {
            _id: { $in: supportRequestDocument.messages },
            author: filterQuery.user,
          },
          { readAt: new Date(params.createdBefore) },
        );
      })
      .then(() => ({ success: true }));
  }

  getUnreadCount(supportRequest: string): Promise<number> {
    return this.supportRequestModel
      .findById(supportRequest)
      .populate('user')
      .populate('messages')
      .exec()
      .then((supportRequestDocument) => {
        return supportRequestDocument.messages.length;
      });
  }
}
