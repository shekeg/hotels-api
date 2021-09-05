import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import {
  IUserService,
  SearchUserParams,
} from './interfaces/search-user-params';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(data: CreateUserDto) {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  findAll(params: SearchUserParams) {
    const queryFilter: FilterQuery<UserDocument> = {};

    if (params) {
      if (params.email) {
        queryFilter.email = { $regex: new RegExp(params.email, 'i') };
      }

      if (params.name) {
        queryFilter.name = { $regex: new RegExp(params.name, 'i') };
      }

      if (params.contactPhone) {
        queryFilter.contactPhone = {
          $regex: new RegExp(params.contactPhone, 'i'),
        };
      }

      if (params.limit) {
        queryFilter.limit = +params.limit;
      }

      if (params.offset) {
        queryFilter.offset = +params.offset;
      }
    }

    return this.userModel
      .find(queryFilter, 'email name contactPhone')
      .limit(+queryFilter.limit)
      .skip(+queryFilter.offset)
      .exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
