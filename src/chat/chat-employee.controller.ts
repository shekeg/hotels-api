import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { ManagerGuard } from 'src/common/guards/manager.guard';
import { ISearchSupportRequestParams } from 'src/support-request/interfaces/search-support-request-params.interface';
import { SupportRequestEmployeeService } from 'src/support-request/support-request-employee.service';

@Controller()
export class ChatEmployeeController {
  constructor(
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get('api/manager/support-requests')
  searchSupportRequests(@Query() params: ISearchSupportRequestParams) {
    return this.supportRequestEmployeeService.searchSupportRequests(params);
  }
}
