import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserParams } from './interfaces/search-user-params';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: SearchUserParams) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
