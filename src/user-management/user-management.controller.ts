import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { ManagerGuard } from 'src/common/guards/manager.guard';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserParams } from './interfaces/search-user-params';
import { UserManagementService } from './user-management.service';

@Controller()
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Post('api/admin/users')
  async create(@Body() data: CreateUserDto) {
    const userDocument = await this.userManagementService.create(data);
    return {
      _id: userDocument._id,
      email: userDocument.email,
      name: userDocument.name,
      contactPhone: userDocument.contactPhone,
      role: userDocument.role,
    };
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Get('/api/admin/users')
  async findAllForAdmin(@Query() params: SearchUserParams) {
    return this.usersService.findAll(params);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get('/api/manager/users')
  async findAllForManager(@Query() params: SearchUserParams) {
    return this.usersService.findAll(params);
  }
}
