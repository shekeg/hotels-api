import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISupportRequestEmployeeService } from './interfaces/support-request-employee-service.interface';
import { Message } from './messages.schema';
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
  ) {}

  markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const filterQuery: FilterQuery<SupportRequestDocument> = {};

    if (params.user) {
      filterQuery.user = params.user;
    }

    if (params.supportRequest) {
      filterQuery._id = params.supportRequest;
    }

    if (params.createdBefore) {
      filterQuery.created = { $gt: params.createdBefore };
    }

    this.supportRequestModel
      .find(filterQuery)
      .exec()
      .then((supportRequestDocument) => {
        return supportRequestDocument;
      });
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
