import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISearchSupportRequestParams } from './interfaces/search-support-request-params.interface';
import { ISupportRequestEmployeeService } from './interfaces/support-request-employee-service.interface';
import { Message, MessageDocument } from './messages.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './support-request.schema';

export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  searchSupportRequests(params: ISearchSupportRequestParams) {
    const queryFilter: FilterQuery<SupportRequestDocument> = {};

    if (params && params.isActive) {
      queryFilter.isActive = params.isActive;
    }

    return this.supportRequestModel
      .find(queryFilter, 'createdAt isActive')
      .populate('user', 'name email contactPhone')
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
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
  closeRequest(supportRequest: string): Promise<void> {
    return this.supportRequestModel
      .findByIdAndUpdate(supportRequest, {
        isActive: false,
      })
      .then(() => null);
  }
}
