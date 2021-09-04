import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { MarkMessagesAsReadDto } from './dto/mark-messages-as-read.dto';
import { ISupportRequestClientService } from './interfaces/support-request-client-service.interface';
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
  ) {}

  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const createdSupportRequest = new this.supportRequestModel(data);
    return createdSupportRequest.save();
  }

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
}
