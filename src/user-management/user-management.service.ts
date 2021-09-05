import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserManagementService {
  constructor(private readonly usersService: UsersService) {}

  async create(data: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(data.password, 10);

      return await this.usersService.create({
        email: data.email,
        name: data.name,
        passwordHash,
        contactPhone: data.contactPhone,
        role: data.role,
      });
    } catch (err) {
      const hasKeyDuplicate = err.code === 11000;
      if (hasKeyDuplicate) {
        throw new BadRequestException('Email is already exist');
      }
      throw new Error(err);
    }
  }
}
