import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Query,
  Get,
  Param,
} from '@nestjs/common';
import { ManagerOrClientGuard } from 'src/common/guards/manager-or-client.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { ManagerGuard } from 'src/common/guards/manager.guard';
import { ISearchSupportRequestParams } from 'src/support-request/interfaces/search-support-request-params.interface';
import { SupportRequestClientService } from 'src/support-request/support-request-client.service';
import { SupportRequestEmployeeService } from 'src/support-request/support-request-employee.service';
import { SupportRequestService } from 'src/support-request/support-request.service';

@Controller()
export class ChatController {
  constructor(
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @UseGuards(AuthenticatedGuard, ManagerOrClientGuard)
  @Get('api/common/support-requests/:id/messages')
  getMessages(@Param('id') id: string) {
    return this.supportRequestService.getMessages(id);
  }

  @UseGuards(AuthenticatedGuard, ManagerOrClientGuard)
  @Post('api/common/support-requests/:id/messages')
  sendMessage(
    @Request() req,
    @Param('id') id: string,
    @Body('text') text: string,
  ) {
    return this.supportRequestService.sendMessage({
      author: req.user._doc._id,
      supportRequest: id,
      text: text,
    });
  }

  @UseGuards(AuthenticatedGuard, ManagerOrClientGuard)
  @Post('api/common/support-requests/:id/messages/read')
  markMessagesAsRead(
    @Request() req,
    @Param('id') id: string,
    @Body('createdBefore') createdBefore: Date,
  ) {
    const { role } = req.user._doc;
    const payload = {
      user: req.user._doc._id,
      supportRequest: id,
      createdBefore: createdBefore,
    };

    if (role === 'client') {
      return this.supportRequestClientService.markMessagesAsRead(payload);
    }

    if (role === 'manager') {
      return this.supportRequestEmployeeService.markMessagesAsRead(payload);
    }
  }
}
